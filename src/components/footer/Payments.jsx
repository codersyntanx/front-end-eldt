export default function Payments({text}){
	return(
		<>
			<span className='title-bottom'>{text}</span>
			<ul className="payments flex f-direction-row">
				<li><img src="/images/payments/visa.png" alt="" /></li>
				<li><img src="/images/payments/mastercard.png" alt="" /></li>
				<li><img src="/images/payments/american-express.png" alt="" /></li>
				<li><img src="/images/payments/diners-club.png" alt="" /></li>
				<li><img src="/images/payments/discover.png" alt="" /></li>
				<li><img src="/images/payments/elo.png" alt="" /></li>
				<li><img src="/images/payments/paypal.png" alt="" /></li>
				<li><img src="/images/payments/hiper.png" alt="" /></li>
				<li><img src="/images/payments/hipercard.png" alt="" /></li>
				<li><img src="/images/payments/sodexo.png" alt="" /></li>
			</ul>
		</>
	)
}
