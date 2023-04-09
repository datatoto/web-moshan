import { Compass } from "../models/Compass";
import { Ground } from "../models/Ground";

export default function ChapterOne({ children }) {
  return (
    <>
      <Compass scale={[0.1, 0.1, 0.1]} position={[0, 1.5, 0]} />
      <Ground />
    </>
  );
}
