import React, { Component } from 'react';
import { notification } from 'antd';
class LanguageSwicher extends Component {
    constructor(props) {
        super(props);
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    render() {
        return (
            <div className="ps-dropdown language">
                <a href="#" onClick={this.handleFeatureWillUpdate.bind(this)}>
                    <img
                        src="/static/img/flag/en.png"
                        alt="Sonar POS Ecommerce"
                    />
                    English
                </a>
                <ul className="ps-dropdown-menu">
                    <li>
                        <a
                            href="#"
                            onClick={this.handleFeatureWillUpdate.bind(this)}>
                            <img
                                src="/static/img/flag/germany.png"
                                alt="Sonar POS Ecommerce"
                            />
                            Germany
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={this.handleFeatureWillUpdate.bind(this)}>
                            <img
                                src="/static/img/flag/fr.png"
                                alt="Sonar POS Ecommerce"
                            />
                            France
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default LanguageSwicher;
