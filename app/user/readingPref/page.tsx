import Link from "next/link";
import "./style.css";

const page = () => {
  return (   
    <div className="page-background">
    <div className="card">
      <h1 style={{color:"orange", textAlign:"center"}}>Which Like</h1>
      <h2 style={{color:"black", textAlign:"center"}}>Choose your reader per</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "600px",
          margin: "0 auto",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Type here..."
          style={{
            width: "250px",
            height: "50px",
            backgroundColor: "white",
            border: "2px solid orange",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />


        <input
          type="text"
          placeholder="Type here..."
          style={{
            width: "250px",
            height: "50px",
            backgroundColor: "white",
            border: "2px solid orange",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />

        <input
          type="text"
          placeholder="Type here..."
          style={{
            width: "250px",
            height: "50px",
            backgroundColor: "white",
            border: "2px solid orange",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />

        <input
          type="text"
          placeholder="Type here..."
          style={{
            width: "250px",
            height: "50px",
            backgroundColor: "white",
            border: "2px solid orange",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />

        <input
          type="text"
          placeholder="Type here..."
          style={{
            width: "250px",
            height: "50px",
            backgroundColor: "white",
            border: "2px solid orange",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />

        <input
          type="text"
          placeholder="Type here..."
          style={{
            width: "250px",
            height: "50px",
            backgroundColor: "white",
            border: "2px solid orange",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />

        <input
          type="text"
          placeholder="Type here..."
          style={{
            width: "250px",
            height: "50px",
            backgroundColor: "white",
            border: "2px solid orange",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />

        <input
          type="text"
          placeholder="Type here..."
          style={{
            width: "250px",
            height: "50px",
            backgroundColor: "white",
            border: "2px solid orange",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />
        <input
          type="text"
          placeholder="Type here..."
          style={{
            width: "250px",
            height: "50px",
            backgroundColor: "white",
            border: "2px solid orange",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />

        <input
          type="text"
          placeholder="Type here..."
          style={{
            width: "250px",
            height: "50px",
            backgroundColor: "white",
            border: "2px solid orange",
            borderRadius: "6px",
            padding: "10px",
            margin: "5px",
            fontSize: "14px",
            color: "black",
          }}
        />
      </div>
            {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "600px",
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "0",
        }}
      >
        <a href="/nextpage"
        style={{
            background: "none",
            border: "none",
            color: "#6b4b2f",
            fontSize: "14px",
            cursor:"pointer",
            marginRight:"15px",
        }}
        >
            Skip
        </a>

        <a
          href="/nextpage"
          style={{
            backgroundColor: "#d8791b",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "14px",
            cursor: "pointer",
            display: "inline-block",
          }}>
          Next →
        </a>
      </div>
    </div>
</div>
  );
};

export default page;