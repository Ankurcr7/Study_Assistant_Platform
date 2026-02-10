const { OpenRouter } = require("@openrouter/sdk");

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

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get AI response",
    });
  }
};


const generateQuiz = async (req,res)=>{
    try {
        const { topic } = req.body;
    
        if (!topic) {
          return res.status(400).json({ message: "Prompt is required" });
        }
    
        const completion = await openRouter.chat.send({
          chatGenerationParams: {
            model: "openai/gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: `Topic: ${topic} and in json format: {"questions": [{"question": "","options": [],"answer": ""}]} in a clean way without using any extra dialogue or "\n"!, just give the output in json format`,
              },
            ],
            stream: false,
          },
        });
    
        const answer = completion.choices[0].message.content;
    
        res.status(200).json({
          success: true,
          answer,
        });
      } catch (error) {
        console.error("AI Controller Error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to get AI response",
        });
      }
};

module.exports = { askAI, generateQuiz };
