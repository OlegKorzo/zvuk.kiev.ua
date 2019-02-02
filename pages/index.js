import React from 'react'
import ReactTooltip from 'react-tooltip'
import Head from 'next/head'
import Link from 'next/link'


export default class extends React.Component {
	static async getInitialProps({req}) {
		// const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
		return {}
	}

	constructor(props) {
		super(props);
		this.state = {
			timing: 180,
			bpm: 120,
			vocal: 0,
			backVocal: 0,
			guitarAc: 0,
			guitar: 0,
			guitarLine: 0,
			base: 0,
			baseLine: 0,
			additional: 0,
			synth: 0,
			arrange: false,
			session: 0,
			consultation: false,
			urgency: 0,
			price: 0,
			reInstrument: 0,
			reVocal: 0,
			urgent: 0,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.calculatePrice();
	}

	calculatePrice() {
		let price = 0;


		price = this.state.timing * (
			+ this.state.vocal * 4 +
			+ this.state.backVocal +
			+ this.state.guitarAc * 3.5 +
			+ this.state.guitarLine * 3 +
		+ this.state.guitar * 5 +
			+ this.state.base * 3 +
			+ this.state.baseLine * 4 +
			+ this.state.additional * 3 +
			+ this.state.reInstrument * 4 +
			+ this.state.reVocal * 4 +
			+ this.state.synth * 1.75
		) * this.state.bpm / 120;

		// price = price + price * 0.33 * (this.state.arrange ? 1 : 0) + this.state.session * 300;

		price = price + 0.5 * price * this.state.urgent;
		price = price + 0.5 * price * this.state.arrange;

		this.setState({
			price: Math.round(price / 10) * 1000 / 100,
		});
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		const state = {};
		state[event.currentTarget.name] = value;
		this.setState(state, () => {
			this.calculatePrice();
		});

	}

	render() {
		return (
			<div className="zv-layout">
	<div className="zv-logo"></div>
	<div className="price-sticky"><span>Стоимость: </span>{this.state.price}<span>₴</span></div>
	<div className="zv-box">
		<div className="zv-box _inner">
			<div className="zv-line">
				<div className="zv-calc">
					<label>Тайминг</label>
					<input type="number" name={"timing"} value={this.state.timing} onChange={this.handleChange}/>
					<span>В секундах</span>
				</div>
				<div className="zv-calc">
					<label>BPM</label>
					<input type="number" name={"bpm"} value={this.state.bpm} onChange={this.handleChange}/>
					<span> </span>
				</div>
				<div className="zv-calc">
					<label>Вокал</label>
					<input type="number" name={"vocal"} value={this.state.vocal} onChange={this.handleChange}/>
					<span>Кол-во треков</span>
				</div>
				<div className="zv-calc">
					<label>Бэк-вокал</label>
					<input type="number" name={"backVocal"} value={this.state.backVocal} onChange={this.handleChange}/>
					<span>Кол-во треков</span>
				</div>
			</div>

			<div className="zv-line">
				<div data-tip="" className="zv-calc">
					<label>Электроакустическая гитара<br/>(линия + микрофон)</label>
					<input type="number" name={"guitarAc"} value={this.state.guitarAc} onChange={this.handleChange}/>
					<span>Кол-во треков</span>
				</div>
				<div data-tip="Запись в линию с последующей цифровой обработкой без применения комбоусилителя" className="zv-calc">
					<label>Электрогитара<br/>(линия)</label>
					<input type="number" name={"guitarLine"} value={this.state.guitarLine} onChange={this.handleChange}/>
					<span>Кол-во треков</span>
				</div>
				<div data-tip="Запись с применением процесса реампинга" className="zv-calc">
					<label>Электрогитара<br/>(комбоусилитель)</label>
					<input type="number" name={"guitar"} value={this.state.guitar} onChange={this.handleChange}/>
					<span>Кол-во треков</span>
				</div>
				<div data-tip="Запись в линию с последующей цифровой обработкой без применения комбоусилителя" className="zv-calc">
					<label>Бас-гитара<br/>(линия)</label>
					<input type="number" name={"baseLine"} value={this.state.baseLine} onChange={this.handleChange}/>
					<span>Кол-во треков</span>
				</div>
				<div data-tip="Запись с применением процесса реампинга" className="zv-calc">
					<label>Бас-гитара<br/>(комбоусилитель)</label>
					<input type="number" name={"base"} value={this.state.base} onChange={this.handleChange}/>
					<span>Кол-во треков</span>
				</div>

			</div>

			<div className="zv-line">
				<div className="zv-calc">
					<label>Другие инструменты</label>
					<input type="number" name={"additional"} value={this.state.additional} onChange={this.handleChange}/>
					<span>Кол-во треков</span>
				</div>
				<div className="zv-calc">
					<label>Синтетический трек</label>
					<input type="number" name={"synth"} value={this.state.synth} onChange={this.handleChange}/>
					<span>Кол-во треков</span>
				</div>
				<div className="zv-calc">
					<label>Повторная запись вокала</label>
					<input type="number" name={"reVocal"} value={this.state.reVocal} onChange={this.handleChange}/>
					<span> </span>
				</div>
				<div className="zv-calc">
					<label>Повторная запись инструмента</label>
					<input type="number" name={"reInstrument"} value={this.state.reInstrument} onChange={this.handleChange}/>
					<span> </span>
				</div>
			</div>


			<div className="zv-line">
				<div className="zv-calc">
					<label>Аранжировка</label>
					<label>
						<input type="Checkbox" name={"arrange"} value={this.state.arrange} onChange={this.handleChange}/>
						<div/>
					</label>
					<span> </span>
				</div>

				<div className="zv-calc">
					<label>Срочный заказ</label>
					<label>
						<input type="Checkbox" name={"urgent"} value={this.state.urgent} onChange={this.handleChange}/>
						<div/>
					</label>
					<span> </span>
				</div>
			</div>

		</div>
		<div className="zv-copyright">
			Студия ZVUK™ — и время не в счёт<br/>
			+38.068.02.02.015
		</div>
	</div>
	<ReactTooltip />
</div>
		)
	}
}