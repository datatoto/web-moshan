import { Steps } from "antd";
import { useCurrentCh } from "../stores";

export default function ProgressSteps(props) {
  const [currentCh, chapterInfo, setCurrentCh] = useCurrentCh((state) => [
    state.currentCh,
    state.chapterInfo,
    state.setCurrentCh,
  ]);

  const onChange = (v) => {
    setCurrentCh(v);
  };

  return (
    <Steps
      {...props}
      current={currentCh}
      items={chapterInfo}
      onChange={onChange}
    />
  );
}
