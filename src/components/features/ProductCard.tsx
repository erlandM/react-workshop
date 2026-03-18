interface ProductCardProps {
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  inStock?: boolean;
}

export function ProductCard(product: ProductCardProps) {
  return (
    <div
      style={{
        height: "200px",
        display: "flex",
        border: "1px solid black",
      }}
    >
        <img
            src={product.imageUrl}
            alt={`An picture of ${product.productName}`}
            style={{ height: "100%", aspectRatio: "1/1", objectFit: "cover" }}
        />
        <div
            style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                color: "white",
            }}
        >
            <span style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontWeight: "bold", fontSize: 18 }}>{product.productName}</h4>
                {!product.inStock && <span style={{ color: "red", fontWeight: "bold" }}>Ikke på lager</span>}
            </span>
            <span style={{ color: "GrayText", width: "100%" }}>{product.description}</span>
            <span style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto" }}>
                <span style={{ fontWeight: "bold", fontSize: 28 }}>{product.price.toLocaleString("no-NO")} kr</span>
                <button style={{ padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "0.25rem" }} disabled={!product.inStock}>
                    Kjøp
                </button>
            </span>
        </div>
    </div>
  );
}