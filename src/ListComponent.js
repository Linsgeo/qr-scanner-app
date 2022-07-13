const ListComponent = (props) => {
  return (
    <div style={{margin:'10%'}}>
      <h2 style={{ textAlign: "left" }}>Scanned QR Items</h2>
      {props.data &&
        props.data.map((item,index) => <p style={{ textAlign: "left" }}>{item}</p>)}
    </div>
  );
};

export default ListComponent;
