/**
 * @file 大图的组件
 * @author season
 */

 import Component from './component';
 
 export default class BigPic extends Component {
     
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        console.log('data2:', data);
        return `<div class="item big-pic">
                    <img src="${data.imageList[0]}" />
                </div>`;
    }
 }