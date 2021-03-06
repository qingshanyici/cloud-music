import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import {ScrollContainer} from "./style.js"



//forwardRef是react中的一个函数
const Scroll = forwardRef ((props, ref) => {  //better-scroll 实例对象
  const [bScroll, setBScroll] = useState ();  //current 指向初始化 bs 实例需要的 DOM 元素 
  const scrollContaninerRef = useRef ();
  const { direction, click, refresh,  bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll } = props;




// 创建better-scroll
  useEffect (() => {
    const scroll = new BScroll (scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll (scroll);
    return () => {
      setBScroll (null);
    }
    //eslint-disable-next-line
  }, []);

  //每次重新渲染都需要刷新
  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh ();
    }
  });

  

  useEffect (() => {
    if (!bScroll || !onScroll) return;
    bScroll.on ('scroll', (scroll) => {
      onScroll (scroll);
    })
    return () => {
      bScroll.off ('scroll');
    }
  }, [onScroll, bScroll]);

  useEffect (() => {
    if (!bScroll || !pullUp) return;
    bScroll.on ('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100){
        pullUp ();
      }
    });
    return () => {
      bScroll.off ('scrollEnd');
    }
  }, [pullUp, bScroll]);

  useEffect (() => {
    if (!bScroll || !pullDown) return;
    bScroll.on ('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown ();
      }
    });
    return () => {
      bScroll.off ('touchEnd');
    }
  }, [pullDown, bScroll]);


  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh ();
    }
  });

  useImperativeHandle (ref, () => ({
    refresh () {
      if (bScroll) {
        bScroll.refresh ();
        bScroll.scrollTo (0, 0);
      }
    },
    getBScroll () {
      if (bScroll) {
        return bScroll;
      }
    }
  }));


  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  );
})

//默认值
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

//组件需要接受的参数
Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll;