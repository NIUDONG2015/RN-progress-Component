/**
 * 组件样式
 *    1 张三丰                          ￥12345621432
 *      --------------进度条                  50.21% （完成率）
 *    2 张三丰                          ￥12345621432
 *      --------------进度条                  50.21% （完成率）
 * 
 * 使用组件   react-native-progress  命令   npm install react-native-progress --save  

 	rankDataArr: [
                {src: require('../../../Image/sale_list_ic_1.png'),name:'张三丰1区',moneyNum:'7544532143254542',completionRate:'50'},
                {src: require('../../../Image/sale_list_ic_2.png'),name:'张三丰2区',moneyNum:'7544532143254542',completionRate:'50'},
                {src: require('../../../Image/sale_list_ic_3.png'),name:'张三丰3区',moneyNum:'7544532143254542',completionRate:'50'},
                {src: require('../../../Image/sale_list_ic_3.png'),name:'张三丰4区',moneyNum:'7544532143254542',completionRate:'50'},
                {src: require('../../../Image/sale_list_ic_3.png'),name:'张三丰5区',moneyNum:'7544532143254542',completionRate:'50'},
            ]

 * 
 * 调用组件
 *  {
        this.state.rankDataArr.map( (item, n) => {
            return  <ProressComponent 
                        imgSrc = { n < 3 ? item.src : ''}    //前三名 渲染图片
                        imgIndex = {n+1}                    // 通过下标判断是不是前三
                        name = {item.name}                  //名称
                        moneyNum = {item.moneyNum}          //money
                        completionRate = {item.completionRate}   //   完成率
                    />
        })
    }
 *     
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, InteractionManager, Image,Actions, ActionConst,Dimensions} from 'react-native';

/**
 *  注意这里不能用ES6的引用方式，
 * 由于该插件源码封装比较老，所以只能用ES5的引入
 * var Progress = require('react-native-progress');
*/
var Progress = require('react-native-progress');

export default class ProgressPage extends Component {
    /**初始化数据*/
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            indeterminate: false,
        };
    }

    componentDidMount() {
        this.animate();
    }

    // 渲染
    animate(){
        setTimeout(()=> {
            this.setState({ 
                progress:.8 
            });
            if(this.state.progress > 1) {
                this.setState({ 
                    progress:1 
                });
            }
        },2000)
    }

    render() {
        return  (
            <View style={{
                height:80,
                borderBottomColor:LLSimpleLineColor,
                borderBottomWidth:1/global.LLPixelRatio,
                justifyContent:'center',
                marginLeft:10,
                marginRight:10
            }}>
                <View style={{flexDirection:'row',justifyContent:'flex-end',height:22}}>
                    <Image
                        style={{width:22,
                            height:22,
                            marginRight:5,
                            display:this.props.imgSrc ? 'flex' : 'none'
                        }}
                        source = {this.props.imgSrc}
                    />
                    <Text style={{width:22,
                            height:22,
                            marginRight:5,
                            textAlign:'center',
                            display:this.props.imgSrc ? 'none' : 'flex'
                        }}>{this.props.imgIndex}</Text>

                    <Text style={{justifyContent:'flex-start',flex:1}}>
                        {this.props.name}
                    </Text>
                    <Text style={{color:LLNavigationBar_BGColor}}>
                        ￥ {Thousandth.toQfw (this.props.moneyNum) }
                    </Text>
                </View>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'flex-end',
                    marginTop:15,
                    alignItems:'center'
                }}>
                    <View style={{justifyContent:'flex-start',flex:1}}>
                        <Progress.Bar
                            width={global.deviceWidth*200/375}
                            style={{ marginLeft:30}}
                            progress={this.state.progress}
                            indeterminate={this.state.indeterminate}
                            unfilledColor="#C4CEDB"   // 剩余进度的颜色
                            borderColor={LLClearColor}
                            color={LLNavigationBar_BGColor}
                            borderRadius={8}
                            height={8}
                        />
                    </View>
                    <Text style={{color:'#C4CEDB',textAlign:'center'}}>{this.props.completionRate}% (完成率)</Text>
                </View>
            </View>

        )
    }
}

