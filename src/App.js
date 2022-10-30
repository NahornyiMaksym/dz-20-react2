// Создайте простейшее Реакт приложение
// В нем создайте один функциональный компонент приветствием и картинкой
// Под ним добавте классовый компонент, принемающий пропсы. В пропсу поместите путь к картинке и ее название.
// Сам копонент отображает картинку с подписью и текущую дату.

import React from 'react';
import './App.css';
import myImg from './images/myImg.jpg'
import classImg from './images/classImag.jpg'
import cat from './images/cat.jpg'


import {
    Route,
    BrowserRouter,
    Routes,
    Link,
    Navigate
} from "react-router-dom";


import RouteLinks from "./dz-21-components";
import {CardsWraper, Clock, HelloPage} from "./dz-21-components";

const dateFormat = function () { // Функция для получения даты в формате дд/мм/гггг, которую передаем в пропсы классового компонента

    const date = new Date();
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth()+1  < 10 ? '0' + date.getMonth() : date.getMonth()+1;
    const year = date.getFullYear();
    console.log(month)
    return  `Date - ${day}/${month}/${year}`
}


function GratingFunction(props) { // Функциональный компонент - картинка и приветствие
    return (
        <div className={'gratingContainer'}>
            <img className={'gratingImg'} src={props.image} alt={'gratingImg'}/>
            <p className={'gratingText'}>{props.grating}</p>
        </div>
    )
}


function MyButton(props) { // Кнопка - принимает в себя слушатель и стиль через пропсы, добавлю для практики в классовый компонент
    return (
        <button className={`button ${props.style}`} onClick={props.onClick}>{props.children}</button>
    )
}


class GratingClass extends React.Component { // классовый компонент - картинка, название, дата, кнопка открыть/закрыть
    constructor(props) {
        super(props);

        this.state = { // при изменении на false компонент не отрисовывается
            showComponent: true
        }

        this.onCloseClick = this.onCloseClick.bind(this);
        this.onShowClick = this.onShowClick.bind(this);
    }

    onCloseClick() { // слушатель на кнопку, чтобы закрыть
        console.log('clicked on close')
        this.setState({showComponent: false})
    }

    onShowClick() { // слушатель на кнопку, чтобы открыть
        console.log('clicked on show')
        this.setState({showComponent: true})
    }

    render() {
        return ( // использую тренарный оператор, чтобы либо отрисовывать компонент либо нет
            <>
                {this.state.showComponent ? <div className={'gratingContainer topBorder'}>

                        <MyButton
                            key={'MyButton'}
                            onClick={this.onCloseClick}>

                            Close Class Component
                        </MyButton>

                        <img className={'gratingImg'} src={this.props.classImage} alt={'builder'}/>
                        <p>{this.props.children}</p>
                        <p>{this.props.date}</p>
                    </div> :

                    <div className={'gratingContainer'}>
                        <MyButton
                            key={'MyButton2'}
                            onClick={this.onShowClick}>

                            Show Class Component
                        </MyButton>

                    </div>
                }
            </>
        )
    }
}


function App() {


    return (

        <>
            <BrowserRouter>

                <RouteLinks/>

                <Routes>

                    <Route path="/" element={
                        <>
                            <h1>You are on Home Page</h1>

                            <GratingFunction
                                key={`grating`}
                                image={myImg}
                                grating={'Hello, I\'m not the best picture from function component!)'}
                            />

                            <GratingClass
                                key={`classGrating`}
                                classImage={classImg}
                                date={dateFormat()}
                            >

                                Some Builder
                            </GratingClass>

                        </>

                    }/>


                    <Route path="cards" element={
                        <>
                            <h1>You are on Cards Page</h1>
                            <CardsWraper/>
                        </>
                    }/>

                    <Route path="helloPage" element={
                        <>
                            <h1>You are on Hello Page</h1>
                            <HelloPage
                                key={'helloComponent'}
                                image={cat}
                            >Hello! It's {<Clock/>} o'clock =)</HelloPage>
                        </>
                    }/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
