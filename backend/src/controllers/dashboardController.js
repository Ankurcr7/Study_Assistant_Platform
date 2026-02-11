const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const getUserData = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // 🔥 Convert string to ObjectId
        const userId = new ObjectId(req.user.id);

        const database = client.db("AI_study");

        const notesCount = await database
            .collection("notes")
            .countDocuments({ uploadedBy: userId });

        const aiCount = await database
            .collection("aichats")
            .countDocuments({ user: userId });

        const quizCount = await database
            .collection("quizzes")
            .countDocuments({ user: userId });

        res.json({
            notes: notesCount,
            aiQuestions: aiCount,
            quizzes: quizCount,
        });

    } catch (err) {
        console.error("Dashboard Error:", err);
        res.status(500).json({ message: "Error fetching stats" });
    }
};

module.exports = { getUserData };
