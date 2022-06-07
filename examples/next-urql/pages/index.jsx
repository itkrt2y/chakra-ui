import { useQuery } from "urql"
import { AnimatePresence, motion } from "framer-motion"
import React, { Suspense } from "react"
import {
  Portal,
  useTooltip,
  useMediaQuery,
  Button,
  Stack,
} from "@chakra-ui/react"
import Frame from "react-frame-component"

const IndexPage = () => {
  const [result] = useQuery({ query: "{countries {name emoji}}" })
  const [show] = useMediaQuery("(max-width: 800px)", { ssr: true })
  console.log("width is under 800px", show)

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Stack>
        <Portal>Outside iframe</Portal>

        <Frame style={{ background: "palegreen" }}>
          <Portal>
            In frame
            <Portal appendToParentPortal={false}>frame in frame</Portal>
          </Portal>
        </Frame>

        <WithTransition />

        <ul>
          {result?.data?.countries.map((country) => (
            <li key={country.name}>{country.name}</li>
          ))}
        </ul>
      </Stack>
    </Suspense>
  )
}

export default IndexPage

const WithTransition = () => {
  const {
    getTriggerProps,
    getTooltipPositionerProps,
    getTooltipProps,
    isOpen,
  } = useTooltip({
    openDelay: 100,
  })

  return (
    <div>
      <Button {...getTriggerProps()}>Hover me</Button>
      <AnimatePresence>
        {isOpen && (
          <Portal>
            <div {...getTooltipPositionerProps()}>
              <motion.div
                initial="exit"
                animate="enter"
                exit="exit"
                {...getTooltipProps()}
              >
                <motion.div
                  transition={{
                    duration: 0.12,
                    ease: [0.4, 0, 0.2, 1],
                    bounce: 0.5,
                  }}
                  variants={{
                    exit: { scale: 0.9, opacity: 0 },
                    enter: { scale: 1, opacity: 1 },
                  }}
                  style={{
                    transformOrigin: "var(--popper-transform-origin)",
                    background: "tomato",
                    "--popper-arrow-bg": "tomato",
                    color: "white",
                    borderRadius: "4px",
                    padding: "0.5em 1em",
                  }}
                >
                  This is tooltip
                  <div data-popper-arrow>
                    <div data-popper-arrow-inner />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  )
}
