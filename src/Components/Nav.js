export default function Nav(props){

    const lis = [];
  
    for(let i=0; i<props.topics.length; i++){
      const temp = props.topics[i];
      lis.push(<li key={temp.id}><a id={temp.id} href={'/read/'+temp.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{temp.title}</a></li>);
    }
  
    return <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  }