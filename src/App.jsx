import "./App.css";

import { Bvh, Loader, Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Aside from "./components/Aside";
import { Perf } from "r3f-perf";
import { Scene } from "./components/Scene";
import { Tree } from "./models/Tree";
import { Building } from "./models/Building";
import { Plane } from "./models/Plane";
// import { Arrow} from "./models/Arrow";

const supabase = createClient(
  "https://wwaxlpjlkaxplnqizoog.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3YXhscGpsa2F4cGxucWl6b29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3MjE3MTYsImV4cCI6MTk5NzI5NzcxNn0.1_h9mH-yh3wBZ70fbNRv76DD6F24TkmlmrVhDZnEWcA"
);

function App() {
  const mainView = useRef();
  const ground = useRef(null);

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="glass auth">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["github"]}
          style={{ width: "500px", padding: "20px" }}
          localization={{
            variables: {
              sign_in: {
                email_label: "邮箱地址",
                password_label: "密码",
              },
            },
          }}
        />
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <Canvas
            gl={{ antialias: false }}
            className="canvas"
            eventSource={document.getElementById("root")}
          >
            <Suspense fallback={null}>
              <View index={1} track={mainView}>
                <Bvh firstHitOnly>
                  <Plane ref={ground} />
                </Bvh>
                <Building />
                {/* <Arrow /> */}
                <Tree />
                <Scene ground={ground} /> 
              </View>
            </Suspense>
            <Preload all />
            <Perf position="top-right" />
          </Canvas>

          <Loader />

          <div
            ref={mainView}
            className="panel main"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          ></div>
        </div>

        <Aside />
      </>
    );
  }
}

export default App;
