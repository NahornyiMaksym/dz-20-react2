//========================================================================
//На основе предыдущего ДЗ создайте приложение в котором будет реализован роутинг на 2е локации. Первая будет Страничка приветствия, вторая список карточек сформированных из списка данного ниже.

//Каждая карточка должна быть функциональным компонентом, по клику на нее отобразите над списком карточек имя и телефон выбранной карточки.

// Приветстве реализуйте ввиде классового компонента, добавте туде часы показывающие реальное вермя в формате 13:40:42

import React from 'react';

import {
    Route,
    BrowserRouter,
    Routes,
    Link,
    Navigate
} from "react-router-dom";


export class Clock extends React.Component { // компонент часы
    constructor(props) {
        super(props);

        this.state = {
            time: new Date().toLocaleTimeString()
        }
    }

    componentDidMount() { // обновляет состояние time каждую секунду

        this.timeInterval = setInterval(() => { // добавляем в класс поле timeInterval, для хранения информации об интервале
            this.setState({time: new Date().toLocaleTimeString()})
        }, 1000)
    }

    componentWillUnmount() { // удалит инервал при удалении Clock, чтобы не засорять системные ресурсы
        clearInterval(this.timeInterval)
    }

    render() {
        return (

            <span className={"clockBorder"}>{this.state.time}</span>
        )
    }
}



export class HelloPage extends React.Component { // страничка приветствия в this.props.children вставляю компонент часы
    render() {
        return (
            <div className={'helloContainer'}>
                <img src={this.props.image} alt={'cat'} className={'gratingImg'}/>
                <p className={'App'}>{this.props.children}</p>
            </div>
        )
    }
}

const personslist = [

    {
        name: 'Jon',
        phone: '+380123456789'
    },
    {
        name: 'Alice',
        phone: '+380123123123'
    },
    {
        name: 'Bob',
        phone: '+380123213543'
    }
];

function PersonCard(props) { // отрисовывает карточку

    function onCardClick() { // баблингом передаем данные с карты по которой кликнули => компоненту CardsWrap
        props.cardData(`${props.name} ${props.phone}`)
    }


    return (
        <div className={'cardContainer'} onClick={onCardClick}>
            <p className={'personCardText'}>Name : {props.name}</p>
            <p className={'personCardText'}>Phone : {props.phone}</p>
        </div>
    )
}


export class CardsWraper extends React.Component { // компонент который отрисовывает карточки на основании данного в задании массива, и выводит сверху данные карты на которую кликнули

    constructor(props) {
        super(props);

        this.state = {
            pickedCard: '(click on card)'
        }
        this.cardInfo = this.cardInfo.bind(this)
    }

    cardInfo(event) { // в event записываются данные карты из компонента PersonCard и тут переопределяем состояние - записываем туда данные с карты
        this.setState({pickedCard: this.state.pickedCard = event})
    }

    render() {

        return (
            <>
                <p className={'App'}>You have picked ===> {this.state.pickedCard}</p>
                {personslist.map((personData, index) => {
                    return (
                        <PersonCard
                            key={`personCard - ${index}`}
                            name={personData.name}
                            phone={personData.phone}
                            cardData={this.cardInfo}
                        />
                    )
                })}
            </>
        )
    }
}

function RouteLinks() { // компонент - контейнер с ссылками перехода по Routes
    return (
        <div className={"linksContainer"}>
            <Link className={"routeLinks"} to="/">Go to ==> dz 20 - Home page</Link>
            <Link className={"routeLinks"} to="helloPage">Go to ==> dz 21 - Hello page</Link>
            <Link className={"routeLinks"} to="cards">Go to ==> dz 21 - Cards page</Link>
        </div>
    )
}
export default RouteLinks;