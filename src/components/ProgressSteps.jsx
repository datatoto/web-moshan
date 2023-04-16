import { Steps } from "antd";
import { useCurrentCh } from "../stores";

export default function ProgressSteps(props) {
  const [currentCh, chapterTitles, setCurrentCh] = useCurrentCh((state) => [
    state.currentCh,
    state.chapterTitles,
    state.setCurrentCh,
  ]);

  const onChange = (v) => {
    setCurrentCh(v)
  };

  return (
    <Steps
      current={currentCh}
      items={chapterTitles}
      onChange={onChange}
      className="progress glass"
    />
  );
}
