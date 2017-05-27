import React, {Component} from 'react'
import reset from "../styles/reset.css"
import tabs from "../styles/tabs.css"
import TabGroup from 'electron-tabs'
import tabsStyle from "electron-tabs/electron-tabs.css"
import dragula from "dragula"
import dragulaStyle from "dragula/dist/dragula.css"

export default class Tabs extends Component{

    constructor(){
        super();
    }

    addTab(){
        return this.tabGroup.addTab();
    }

    componentDidMount(){
        this.tabGroup = new TabGroup({
            newTab: {
                title: "Application",
                src: "application.html",
                visible: true,
                webviewAttributes: {
                    nodeintegration: true,
                    plugins: true
                }
            },
            ready: function (tabGroup) {
                dragula([tabGroup.tabContainer], {
                    direction: "horizontal"
                });
            }
        });
        this.tabGroup.on("tab-added", (tab) => tab.activate());
        this.addTab().activate();
    }

    render(){
        return (
            <div>
                <div className="etabs-tabgroup">
                    <div className="etabs-tabs"></div>
                    <div className="etabs-buttons"></div>
                </div>
                <div className="etabs-views"></div>
            </div>
        )
    }

}
