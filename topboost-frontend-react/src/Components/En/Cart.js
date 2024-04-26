import React from "react"

const Cart = () => {
	return (
		<div className="nk-cart">
			<div className="nk-gap-2" />
			<div className="container">
				<div className="nk-store nk-store-cart">
					<div className="table-responsive">
						<table className="table nk-store-cart-products">
							<tbody>
								<tr>
									<td className="nk-product-cart-thumb">
										<a
											href="store-product.html"
											className="nk-post-image"
										>
											<img
												src={
													process.env.PUBLIC_URL +
													"/assets/images/product-2-sm.png"
												}
												alt="Men Tshirt"
												className="nk-img"
											/>
										</a>
									</td>
									<td
										className="nk-product-cart-title"
										data-title="Product"
									>
										<h2 className="nk-post-title h5">
											<a href="store-product.html">
												Men Tshirt
											</a>
										</h2>
									</td>
									<td
										className="nk-product-cart-price"
										data-title="Price"
									>
										&nbsp; $67.00&nbsp;
									</td>
									<td
										className="nk-product-cart-quantity"
										data-title="Quantity"
									>
										&nbsp; 1&nbsp;
									</td>
									<td
										className="nk-product-cart-total"
										data-title="Total"
									>
										&nbsp; $67.00&nbsp;
									</td>
									<td className="nk-product-cart-remove">
										<a href="javascript:void(none)">
											<span className="ion-trash-b" />
										</a>
									</td>
								</tr>
								<tr>
									<td className="nk-product-cart-thumb">
										<a
											href="store-product.html"
											className="nk-post-image"
										>
											<img
												src={
													process.env.PUBLIC_URL +
													"/assets/images/product-4-sm.png"
												}
												alt="Men Hoodie"
												className="nk-img"
											/>
										</a>
									</td>
									<td
										className="nk-product-cart-title"
										data-title="Product"
									>
										<h2 className="nk-post-title h5">
											<a href="store-product.html">
												Men Hoodie
											</a>
										</h2>
									</td>
									<td
										className="nk-product-cart-price"
										data-title="Price"
									>
										&nbsp; $125.00 <del>$145.00</del>
									</td>
									<td
										className="nk-product-cart-quantity"
										data-title="Quantity"
									>
										&nbsp; 2&nbsp;
									</td>
									<td
										className="nk-product-cart-total"
										data-title="Total"
									>
										&nbsp; $250.00&nbsp;
									</td>
									<td className="nk-product-cart-remove">
										<a href="javascript:void(none)">
											<span className="ion-trash-b" />
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="nk-gap-2" />
					<div className="nk-cart-total">
						&nbsp; Total <span>$317</span>
					</div>
					<div className="nk-gap-3" />
					<div className="nk-cart-btns">
						<a
							href="store-checkout.html"
							className="nk-btn nk-btn-lg nk-btn-color-main-1 link-effect-4"
						>
							&nbsp; Go to Checkout&nbsp;
						</a>
						&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<a
							href="javascript:void(none)"
							className="nk-btn nk-btn-lg link-effect-4 nk-cart-toggle"
						>
							&nbsp; Continue Shopping&nbsp;
						</a>
					</div>
				</div>
			</div>
			<div className="nk-gap-5" />
		</div>
	)
}

export default Cart
