
//initiate payment

const fronted = () => {
    const nafis =()=>{
        axios.post('http://localhost:5000/sslComerece',{
          amount:100,
        })
        .then(res=>{
           console.log(res.data)
           if(res.data){
            window.location.replace(res.data.paymentUrl)
           }
        })
    }
    return (
        <div>
         <button onClick={nafis} className="btn btn-primary">Click</button>
        </div>
    );
};

export default fronted;

// 