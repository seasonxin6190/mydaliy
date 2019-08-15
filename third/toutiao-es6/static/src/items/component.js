/**
 * @file 所有模板文件的基类
 * @author yuanxin
 */

export default class Component {

	constructor(props) {
		this.props = props;
	}

	render() {
		return '<div></div>';
	}

	constructElement() {
		const html = this.render();
		const $content = document.createElement('div');
		const $container = document.createElement('div');
		$container.appendChild($content);
		$content.outerHTML = html;
		this.el = $container.firstChild;
		return this.el;
	}

}