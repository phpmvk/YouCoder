// import React, { useState } from 'react';
// import SplitPane, { Pane } from 'split-pane-react';

// export default function ResizableIFrame() {
//   const [sizes, setSizes] = useState<(number | string)[]>([100, 200, 'auto']);

//   const layoutCSS = {
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   };

//   return (
//     <div style={{ height: 500 }}>
//       <SplitPane
//         split='vertical'
//         sizes={sizes}
//         primary='second'
//       >
//         <Pane
//           minSize={50}
//           maxSize='50%'
//         >
//           <div style={{ ...layoutCSS, background: '#ddd' }}>pane1</div>
//         </Pane>
//         <div style={{ ...layoutCSS, background: '#d5d7d9' }}>pane2</div>
//         <div style={{ ...layoutCSS, background: '#a1a5a9' }}>pane3</div>
//       </SplitPane>
//     </div>
//   );
// }
