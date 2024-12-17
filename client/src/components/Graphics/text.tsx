import { Text, Container } from "@pixi/react";
import { useContext } from "react";
import { Monsters } from "../../assets/Monsters/Monster";
import { stageContext } from "../../assets/context/stage";

const Texts: React.FC = () => {


    let {stageProps, 
        activeMonster,
      } = useContext(stageContext)

    return(<>
    <Container x={stageProps.width * 0.5 - 50} y={20} name={"test-battle-pixi-activeMonster"}>
      <Text
        text={`${activeMonster.name}`}
      />
    </Container>
    </>)
}

export default Texts