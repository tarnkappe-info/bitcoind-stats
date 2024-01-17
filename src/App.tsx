import Layout from "./components/layout";
import Main from "./components/main";
import { JiProvider } from "./ji-context";

function App() {
  return (
    <Layout>
      <JiProvider>
        <div className="container my-5">
          <Main />
        </div>
      </JiProvider>
    </Layout>
  );
}

export default App;
