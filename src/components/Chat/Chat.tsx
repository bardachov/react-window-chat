import React, { FC, useRef, useEffect } from "react";
import styles from './Chat.module.scss';
import {useResizeObserver} from './hooks/useResizeObserver';
import {VariableSizeList as List} from 'react-window';
// import Message from './components/Message';

const messagesMock = [{"content":"Et consequatur aut dolores explicabo laboriosam ea eos.","id":"1"},{"content":"Praesentium sint dolorem qui maiores accusamus et distinctio recusandae voluptas.","id":"2"},{"content":"Eum facere sed eos qui doloribus voluptatem nihil debitis cum.","id":"3"},{"content":"Qui dolor commodi quam.","id":"4"},{"content":"Sed quia nesciunt non necessitatibus culpa consequatur libero.","id":"5"},{"content":"Quis a natus sed.","id":"6"},{"content":"Nobis possimus sit quia.","id":"7"},{"content":"Vero quasi soluta et.","id":"8"},{"content":"Deleniti non sit sit corporis dolorem sed dolorum.","id":"9"},{"content":"Omnis quia modi voluptas rerum in ab voluptas.","id":"10"},{"content":"Nesciunt modi non at fugit nihil vel aut.","id":"11"},{"content":"Vel nostrum sit provident soluta voluptates ducimus quia temporibus dolores.","id":"12"},{"content":"Aut perferendis voluptatem necessitatibus culpa.","id":"13"},{"content":"Praesentium aliquid labore deleniti quasi necessitatibus aut est aliquam.","id":"14"},{"content":"Quae molestiae quia quaerat enim quos sed.","id":"15"},{"content":"Sunt voluptas voluptates voluptatem distinctio ab et magni.","id":"16"},{"content":"Officia commodi soluta facilis numquam nihil enim.","id":"17"},{"content":"Quia minima et a.","id":"18"},{"content":"Unde commodi iste.","id":"19"},{"content":"Illum exercitationem ipsum consequuntur deserunt id facilis.","id":"20"},{"content":"Odit et ea.","id":"21"},{"content":"Ea asperiores repellendus porro et.","id":"22"},{"content":"Accusantium consequatur odio saepe deleniti id.","id":"23"},{"content":"Earum est expedita totam exercitationem at.","id":"24"},{"content":"Et quo porro sit commodi.","id":"25"},{"content":"Provident quis reprehenderit harum ut animi ea doloribus unde ex.","id":"26"},{"content":"Debitis qui amet consequatur nam maiores beatae.","id":"27"},{"content":"Sint voluptas vero adipisci id accusamus eum.","id":"28"},{"content":"Eum qui veniam nisi et repellat sunt reiciendis commodi rerum.","id":"29"},{"content":"Aut debitis quaerat molestiae doloribus aut qui doloribus.","id":"30"},{"content":"Eos suscipit qui reprehenderit ut velit exercitationem fugit autem debitis.","id":"31"},{"content":"Et quod est ut possimus occaecati perferendis non.","id":"32"},{"content":"Aut eum commodi.","id":"33"},{"content":"Esse eaque omnis assumenda rem non.","id":"34"},{"content":"A voluptatum commodi itaque accusantium magnam qui quis eius officiis.","id":"35"},{"content":"Quaerat voluptas dolores aut.","id":"36"},{"content":"Porro occaecati consectetur aut doloribus.","id":"37"},{"content":"Et totam rerum rerum aut hic nostrum laboriosam.","id":"38"},{"content":"Et molestiae aut culpa voluptatem in.","id":"39"},{"content":"Temporibus tenetur voluptates distinctio expedita atque praesentium aut est.","id":"40"},{"content":"Doloribus nisi cum nihil ratione consequuntur.","id":"41"},{"content":"Eum et ut est ipsum animi accusamus.","id":"42"},{"content":"Aliquam reprehenderit recusandae qui.","id":"43"},{"content":"Consequuntur asperiores qui.","id":"44"},{"content":"Maiores et quia perspiciatis exercitationem ipsa voluptatem.","id":"45"},{"content":"Vel ut sint minus minima non illum.","id":"46"},{"content":"Omnis aperiam maiores.","id":"47"},{"content":"Impedit voluptas quia quos aut sint repellat commodi sequi inventore.","id":"48"},{"content":"Repellat est rerum et non doloremque porro officia quia.","id":"49"},{"content":"Dolore mollitia id adipisci recusandae magni iure voluptatum facere nostrum.","id":"50"}];

interface MessageProps {
  index: number,
  style: {},
  message: {
    content: string
  }
  setSize: (index: number, size: number) => void,
}

export const Message: FC<MessageProps> = ({ index, style, message, setSize }) => {
  const ref = useRef<HTMLParagraphElement>(null)
  
  useEffect(() => {
    if (ref.current) {
      const domRect = ref.current.getBoundingClientRect();
      // console.log(ref.current, ref.current.style.marginTop)
      setSize(index, domRect.height+20);
    }
    
  },[ref.current])

  return (
    <p ref={ref} className={styles['chat-message']}>{message.content}</p>
  )
}

export const Chat: FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<List>(null);
  const sizeMap = useRef<Record<number, number>>({});
  
  const {height, width} = useResizeObserver(ref);
  
  const setSize = React.useCallback((index: number, size: number) => {
    console.log("Set Size:", index, size)
    sizeMap.current = { ...sizeMap.current, [index]: size };
    console.log(sizeMap.current)
    handleScroll()
  }, [sizeMap]);

  const getSize = React.useCallback((index: number) => {
    console.log("---Get Size---");
    console.log(index, sizeMap.current)
    
    if(sizeMap.current) {
      return sizeMap.current[index] || 100
    } else {
      return 50
    }
    
  }, []);

  const handleScroll = () => {
    // const { chatHistory } = this.state;
    if(listRef.current) {
      listRef.current.resetAfterIndex(0)
    }
  };

  return(
    <>
    <h1>asdsadsa</h1>
    <div ref={ref} className={styles['chat-wrapper']}>
      <div className={styles['chat-content']} style={{
        height: height,
        width: width/2
      }}>
        <List
          height={height}
          itemCount={messagesMock.length}
          itemSize={getSize}
          width={'100%'}
          ref={listRef}
        >
          {({index, style}) => (
            <div style={style}>
              <Message index={index} style={style} message={messagesMock[index]} setSize={setSize} />
            </div>
          )}
        </List>
      </div>
    </div>
    </>
  )
}