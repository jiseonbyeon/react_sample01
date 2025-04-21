import React from 'react';
import {useState} from 'react';
import Article from './Components/Article.js';
import Nav from './Components/Nav.js';
import Header from './Components/Header.js';

function Create(props){

  return(
    <div>
      <h2>CREATE</h2>
      <form onSubmit={event=>{
        event.preventDefault();

        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title,body);

      }}>
        <p><input type="text" name="title" placeholder="title"/></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create"/></p>
      </form>
    </div>
  );

}

function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <div>
      <h2>UPDATE</h2>
      <form onSubmit={(event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body);
      })}>
        <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
          setTitle(event.target.value);
        }}/></p>
        <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type="submit" value="Update"/></p>
      </form>
    </div>
  );

}

function App() {

  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(5);

  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'js', body:'js is...'},
    {id:4, title:'react', body:'react is...'}
  ]);

  let content = null;
  let button = null;

  if(mode === "WELCOME"){
    content = <Article title="Welcome" content="Hello, WEB"></Article>
    button = <a href="/create" onClick={event=>{
      event.preventDefault();
      setMode("CREATE");
    }}>Create</a>

  }else if(mode === "READ"){

    let title,body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id,id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} content={body}></Article>
    button = <><li><a href="/update" onClick={event=>{
      event.preventDefault();
      setMode("UPDATE");
    }}>Update</a>
    </li>
    <li><input type="button" value="Delete" onClick={()=>{
        
      let newTopics = topics.filter(topic=>topic.id !== id);
      setTopics(newTopics);
      setMode("WELCOME");
    }}/></li></>
  
  }else if(mode === "CREATE"){
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId, title:_title, body:_body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode("READ");
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>;
  }else if(mode === "UPDATE"){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
          title = topics[i].title;
          body = topics[i].body;
      }
    }

    content = <Update title={title} body={body} onUpdate={(_title,_body)=>{

      const updateTopic = {id:id, title:_title, body:_body};
      const newTopics = [...topics];

      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updateTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode("READ");
    }}>
    </Update>
    
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode("WELCOME");
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        setMode("READ");
        setId(id);
      }}></Nav>
      {content}
      {button}
    </div>
  );
}
 
export default App;