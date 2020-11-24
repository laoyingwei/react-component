import React, { ChangeEvent } from "react";
import Input from './components/Input/Input'

///原则做完css和逻辑 再做动画
export default function App () {
  // const onSelect = (number:string) =>{console.log(number)}
  // const [ IsShow,setShow ] = useState(false)
  // let wrapperRef = useRef<HTMLDivElement>(null)
  // useEffect(() => {
  //   /// as 断言
  //   const wrapper = new BetterScroll(wrapperRef.current as HTMLDivElement, {

  //   })
  //   console.log(wrapper)
  // }, []);
  // const handleChangeIsShow = () => {
  //   setShow(!IsShow)
  // }
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  return (
    <div style={{padding:'10px'}}>
      <Input 
      onChange={onChange}
    
      >
      </Input>
    </div>
  )
}