"use strict";(self.webpackChunkftc=self.webpackChunkftc||[]).push([[471],{471:function(t,e,n){n.r(e),n.d(e,{createSwipeBackGesture:function(){return a}});var r=n(9069),i=n(3127),u=n(236),a=(n(1045),function(t,e,n,a,c){var o=t.ownerDocument.defaultView,f=(0,i.i)(t),s=function(t){return f?-t.deltaX:t.deltaX},h=function(t){return f?-t.velocityX:t.velocityX};return(0,u.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return function(t){var e=t.startX;return f?e>=o.innerWidth-50:e<=50}(t)&&e()},onStart:n,onMove:function(t){var e=s(t)/o.innerWidth;a(e)},onEnd:function(t){var e=s(t),n=o.innerWidth,i=e/n,u=h(t),a=u>=0&&(u>.2||e>n/2),f=(a?1-i:i)*n,d=0;if(f>5){var l=f/Math.abs(u);d=Math.min(l,540)}c(a,i<=0?.01:(0,r.k)(0,i,.9999),d)}})})}}]);
//# sourceMappingURL=471.5995dd34.chunk.js.map