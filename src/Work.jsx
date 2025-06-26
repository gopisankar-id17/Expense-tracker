

export default function Work(props) {
    
  return (
    <div>
        <h1>This is a Work Component  </h1>
      {props.nameprops.map((csd)=>(
        <p key={csd.id}>
          {csd.name} {csd.age} 
        </p>
      ))}
        </div>
  )
}
