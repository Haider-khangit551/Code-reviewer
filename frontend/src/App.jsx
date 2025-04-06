import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./App.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";


const App = () => {
  const [code, setCode] = useState(`const greet = ()=>{\n console.log("Namaste") \n}`);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(res.data);
    } catch (error) {
      setReview("Something went wrong while fetching the review.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review-btn">
            Review
          </div>
        </div>
        <div className="right">
          {loading ? (
            <div className="loading"><ImSpinner3 /></div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
