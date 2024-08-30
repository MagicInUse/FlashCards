// Time to input all the card data . . .
// Useful HTML: 
//              &lt; (less than), &gt; (greater than)
//              &#8804; (less than or equal to)
//              &#8805; (greater than or equal to)
//              <sub> (subscript), <sup> (superscript)
//
// Use Ctrl + ? to comment/uncomment multiple lines of code
// card template:
// {
//     id: 1,
//     class: "",
//     front: `<p></p>`,
//     back: `<p></p>
//     <p></p>
//     <p></p>`
// },
const cards = [
    {
        id: 1,
        class: "assessment",
        front: `<p>CHA<sub>2</sub>DS<sub>2</sub>-VAS<sub>c</sub></p>`,
        back: `<p>C - congestive heart failure or EF &#8804; 40%</p>
        <p>H - hypertension</p>
        <p>A - age &#8805; 75</p>
        <p>D - diabetes</p>
        <p>S - stroke / TIA / thromboembolism</p>
        <p>V - vascular disease</p>
        <p>A - age 65-74</p>
        <p>S<sub>c</sub> - sex category</p>`
    },
    {
        id: 2,
        class: "skeletal",
        front: `<p>Treatment for osteoporosis</p>`,
        back: `<p>First line treatment is bisphophonates unless contraindicated</p>
        <p>E.g. alendronate (fosamax), risedronate (actonel)</p>
        <p>Weight bearing exercises to strengthen bones (light weight)</p>`
    },
    {
        id: 3,
        class: "pulmonary",
        front: `<p>Treatment for stridor after extubation</p>`,
        back: `<p>If upper airway edema without vocal cord paralysis then can be treated with cool mist, aerosolized racemic epihephrine, parenteral steroids, &amp; heilox</p>
        <p>If vocal cord paralysis, needs reintubation</p>`
    },
];