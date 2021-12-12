import { useEffect, useState, useRef } from 'react'
import './graph.css'

const ANIMATION_DELAY = 250
const NUMBER = 20

const PRIMARY_COLOR = 'turquoise'
const SECONDARY_COLOR = 'red'

window.addEventListener('resize', () => window.location.reload())

const Graph = () => {
  const [array, setArray] = useState([])
  const [start, setStart] = useState(false)
  const containerRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    generateArray()
  }, [])

  const generateArray = () => {
    const arr = []
    for (let i = 0; i < NUMBER; i++) {
      arr.push(randomNums(20, 100))
    }
    setArray(arr)
  }

  const showModal = () => {
    modalRef.current.style.visibility = 'visible'
    setTimeout(() => {
      modalRef.current.style.visibility = 'hidden'
    }, ANIMATION_DELAY * 4)
  }

  const swap = (el1, el2) =>
    new Promise(resolve => {
      const temp = el1.style.transform
      el1.style.transform = el2.style.transform
      el2.style.transform = temp

      window.requestAnimationFrame(() => {
        setTimeout(() => {
          containerRef.current.insertBefore(el2, el1)
          resolve()
        }, ANIMATION_DELAY)
      })
    })

  const bubbleSort = async () => {
    const bars = document.getElementsByClassName('graph-item')

    for (let i = 0; i < bars.length; i++) {
      for (let j = 0; j < bars.length - i - 1; j++) {
        const barOne = bars[j]
        const barTwo = bars[j + 1]

        barOne.childNodes[0].style.backgroundColor = SECONDARY_COLOR
        barTwo.childNodes[0].style.backgroundColor = SECONDARY_COLOR

        await new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, ANIMATION_DELAY)
        })

        let val1 = parseInt(barOne.childNodes[1].innerHTML)
        let val2 = parseInt(barTwo.childNodes[1].innerHTML)
        if (val1 > val2) {
          await swap(barOne, barTwo)
        }
        barOne.childNodes[0].style.backgroundColor = PRIMARY_COLOR
        barTwo.childNodes[0].style.backgroundColor = PRIMARY_COLOR
      }
    }
    console.log('Sorted')
    setStart(false)
    showModal()
  }

  return (
    <>
      <div ref={modalRef} style={{ visibility: 'hidden' }} className="modal">
        <p className="modal-content">{'Sorting completed! 🥳'}</p>
      </div>
      <div ref={containerRef} className="graph-container">
        {array.map((val, i) => {
          return (
            <div
              className="graph-item"
              key={i}
              style={{
                transform: `translate(${i}px)`
              }}
            >
              <div
                className="graph-bar"
                style={{
                  height: `${val * 3}px`,
                  width: `${
                    containerRef.current.offsetWidth / (array.length * 1.5)
                  }px`,
                  backgroundColor: `rgb(${randomNums(0, 255)}, ${randomNums(
                    0,
                    255
                  )}, ${randomNums(0, 255)})`
                }}
              ></div>
              <div className="graph-item-value">{val}</div>
            </div>
          )
        })}
      </div>
      <div className="btn-container">
        <button
          className="btn"
          disabled={start}
          onClick={() => {
            setStart(true)
            bubbleSort()
          }}
        >
          Bubble Sort
        </button>
        <button className="btn" onClick={() => window.location.reload()}>
          Reset
        </button>
      </div>
    </>
  )
}

export default Graph

export const randomNums = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const arraysAreEqual = (arrayOne, arrayTwo) => {
  if (arrayOne.length !== arrayTwo.length) return false
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false
    }
  }
  return true
}
