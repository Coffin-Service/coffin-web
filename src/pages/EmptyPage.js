import { useEffect } from "react";

const Empty = () => {
    useEffect(()=>{
        closeTab();
      },[])
    function closeTab(){
        window.close();
    }
    return (
        <></>
    )
}

export default Empty
