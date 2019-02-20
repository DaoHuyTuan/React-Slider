import React from "react";
import Item from "./item";
import Arrow from "./arrow";
export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.backSlide = this.backSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.changePosition = this.changePosition.bind(this);
        this.state = {
            items : "",
            sizeItem:"",
            sizeSlider:"",
            distantSlide:-600 // = -width item 
        }
    }
    componentDidMount() {
        const numItems =  (document.querySelectorAll(".item")).length; // number item in slider (not real slider)
        const item =  document.querySelector(".item");
        const sizeItem = parseInt(item.offsetWidth); // width of 1 item
        const sizeSlider = sizeItem * (numItems-2); //size real slider
        this.setState({
            items: item,
            sizeItem: sizeItem,
            sizeSlider:sizeSlider
        })
    }
    backSlide() {
        this.setState({
            distantSlide: this.state.distantSlide + this.state.sizeItem
        })
    }
    nextSlide() {
        this.setState({
            distantSlide: this.state.distantSlide - this.state.sizeItem
        })
    }
    changePosition() {
        let strDistantSlide = "translateX(" + this.state.distantSlide +"px)";
        const slider = document.getElementById("slider");
        slider.style.transform = strDistantSlide;
    } 
    componentDidUpdate(prevProps,prevState) {
        if(this.state.distantSlide != prevState.distantSlide ) {
            this.changePosition();
        }
        //set slider back to the first item  when it reach the end of the Slider
        if(this.state.distantSlide < - this.state.sizeSlider) { 
            setTimeout(
                function(){
                    slider.style.transition = "0s";
                    slider.style.transform = "translateX(-600px)";
                }, 300
            );
                this.state.distantSlide = -600;
        }
        else {
            slider.style.transition = "300ms";
        }
        //set it back to the last item when it reach the beyond the first of the Slider
        if(this.state.distantSlide >= 0) {
            const sizeSlider = -this.state.sizeSlider;
            setTimeout(
                function(){
                    slider.style.transition = "0s";
                    slider.style.transform = "translateX(" + sizeSlider + "px)";
                }, 300
            );
            this.state.distantSlide = -this.state.sizeSlider;
        }else {
            slider.style.transition = "300ms";
        }
    }
    render() {
        let arraySlider = [ // array item in real slider
            {
                "id": 1,
                "bgColor":"red", // = props of component
                "text": 1 // = props of component
            },
            {
                "id": 2,
                "bgColor":"blue",
                "text": 2
            },
            {
                "id": 3,
                "bgColor":"yellow",
                "text": 3
            },
            {
                "id": 4,
                "bgColor":"red",
                "text": 4
            },
            {
                "id": 5,
                "bgColor":"blue",
                "text": 5
            },
            {
                "id": 6,
                "bgColor":"yellow",
                "text": 6
            },
        ]
        //render the real slider
        const listItem = arraySlider.map((item) => {
            return <Item bgColor={item.bgColor} text={item.text} key={item.id} />
        })
        //render the first clone 
        const firstClone = 
            <Item 
                bgColor={arraySlider[arraySlider.length -1].bgColor} 
                text={arraySlider[arraySlider.length -1].text} 
                key={0} 
            />
        //render the last clone 
        const lastClone = 
            <Item 
                bgColor={arraySlider[0].bgColor} 
                text={arraySlider[0].text} 
                key ={arraySlider.length + 1} 
            /> 
        return (
        <div className="main" id="main">
            <Arrow nameClass="arrow left-arrow" kinds="backArrow" OnSlide={this.backSlide}/>
            <div className="Slider" id="slider">
                {firstClone}
                {listItem}
                {lastClone}
            </div>
            <Arrow nameClass="arrow right-arrow" kinds="nextArrow" OnSlide={this.nextSlide}/>
        </div>
        )
    }
}
    