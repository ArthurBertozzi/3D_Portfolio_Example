/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPostion = [0, -6.5, -43];
    let islandRotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPostion, islandRotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPostion;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPostion = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPostion = [0, -4, -4];
    }

    return [screenScale, screenPostion];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{
          near: 0.1, // objetos mais proximos do que 0.1 não serão renderizados
          far: 1000, // objetos mais distantes do que 1000 não serão renderizados
        }}
      >
        {/* wrapper -> enquanto o 3d model estiver carregando aparece o fallback do Suspense  */}
        <Suspense fallback={<Loader />}>
          {/* luz direcional/sol/ambiente */}
          <directionalLight position={[1, 1, 1]} intensity={2} />{" "}
          {/* ilumina todos os objetos sem sombra */}
          <ambientLight intensity={0.5} />
          {/* emite uma luz a partir de um ponto especifico - não será usada nesse caso */}
          {/* <pointLight /> */}
          {/* emite luz para todas as direções mas em formato de um cone - não será usada */}
          {/* <spotLight /> */}
          {/* ilumina a cena por um gradiente */}
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            planeScale={planeScale}
            planePosition={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
