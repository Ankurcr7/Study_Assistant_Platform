const { OpenRouter } = require("@openrouter/sdk");
const AiChat = require("../models/AiChat");
const Quiz = require("../models/Quiz");


const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const completion = await openRouter.chat.send({
      chatGenerationParams: {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: false,
      },
    });

    const answer = completion.choices[0].message.content;

    const chat = await AiChat.create({
      user: req.user.id,
      prompt,
      answer,
    });


    res.status(200).json({
      success: true,
      answer: chat.answer,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get AI response",
    });
  }
};


const generateQuiz = async (req, res) => {
  try {
    const { topic } = req.body;
    const userId = req.user.id;

    if (!topic) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const completion = await openRouter.chat.send({
      chatGenerationParams: {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Generate a multiple choice quiz on the topic: ${topic}. 

            Return the response strictly in valid JSON format using this exact structure:
            {
              "questions": [
                {
                  "question": "",
                  "options": ["", "", "", ""],
                  "answer": ""
                }
              ]
            }
            
            Rules:
            - Do NOT include any explanation, introduction, markdown, or extra text.
            - Do NOT include \n or line breaks.
            - Do NOT include backticks.
            - Output ONLY valid JSON.
            - Each question must have exactly 4 options.
            - The answer must match one of the options exactly.
            `,
          },
        ],
        stream: false,
      },
    });

    const answer = completion.choices[0].message.content;

    let parsed;
    try {
      parsed = JSON.parse(answer);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        raw: answer,
      });
    }

    const savedQuiz = await Quiz.create({
      topic: topic,
      questions: parsed.questions,
      user: userId
    });

    res.status(200).json({
      success: true,
      answer: JSON.stringify(savedQuiz),
    });
  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get AI response",
    });
  }
};

const getChats = async (req, res) => {
  const chats = await AiChat.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(chats);

};

const getQuizHistory = async (req, res) => {
  const quizzes = await Quiz.find({ user: req.user.id })
      .sort({ createdAt: -1 });

  res.json(quizzes);
};



module.exports = { askAI, generateQuiz, getChats, getQuizHistory };
