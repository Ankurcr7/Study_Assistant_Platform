const Features = () => {
    const features = [
      { title: "📄 Document Upload", desc: "Upload PDFs & notes" },
      { title: "🤖 AI Q&A", desc: "Ask questions instantly" },
      { title: "📝 Quiz Generator", desc: "Auto-create quizzes" },
      { title: "☁️ Cloud Notes", desc: "Access anytime anywhere" },
    ];
  
    return (
      <section className="features">
        {features.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>
    );
  };
  
  export default Features;
  