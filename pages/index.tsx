import Head from "next/head";
import { useEffect, useState } from "react";

export default () => {
  let defaultScreenTime: number = 1200;
  let defaultRelaxTime: number = 20;

  if (typeof window !== "undefined") {
    defaultScreenTime = parseInt(localStorage.getItem("time") ?? "1200");
    defaultRelaxTime = parseInt(localStorage.getItem("relax") ?? "20");
  }

  const startIcon = "https://i.imgur.com/uxjKHdL.png";
  const endIcon = "https://i.imgur.com/kzzntlY.png";

  const [isEnabled, setIsEnabled] = useState(false);
  const [focus, setFocus] = useState<"screen" | "relax">("screen");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [time, setTime] = useState(defaultScreenTime);
  const [relaxTime, setRelaxTime] = useState(defaultRelaxTime);
  const [screenTime, setScreenTime] = useState(defaultScreenTime);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const toggle = () => {
    setIsEnabled(!isEnabled);
  };

  const update = () => {
    setTime((time) => time - 1);
  };

  const startTimer = () => {
    if (isEnabled) {
      setIntervalId(setInterval(update, 1000));
    }
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(undefined);
  };

  useEffect(() => {
    if (isEnabled) {
      if (focus === "screen" && time === 0) {
        setFocus("relax");
        new Notification("Relax time start", {
          body: `Will conclude in ${relaxTime} seconds`,
          icon: endIcon,
        });
      } else if (focus === "relax" && time === 0) {
        setFocus("screen");
        new Notification("Screen time start", {
          body: `Will conclude in ${screenTime / 60} minutes`,
          icon: startIcon,
        });
      }
    }
  }, [time]);

  useEffect(() => {
    if (isEnabled) {
      stopTimer();

      setTime(focus === "screen" ? screenTime : relaxTime);

      startTimer();
    }
  }, [focus]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark");
    if (isEnabled) {
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          startTimer();
        }
      });
    } else {
      stopTimer();
      setTime(screenTime);
    }
  }, [isEnabled]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main
        className={
          focus === "screen"
            ? "w-full px-4 md:px-0 pt-8 min-h-screen bg-fiery-rose text-black"
            : "w-full px-4 md:px-0 pt-8 min-h-screen bg-medium-state-blue text-black"
        }
      >
        <div className="container mx-auto">
          <h1 className="font-bold text-6xl">
            {isEnabled ? "Press End to stop" : "Press Start to begin"}
          </h1>
          <button
            className="px-8 py-2 border-4 font-bold rounded-full mt-4 border-eerie-black hover:bg-eerie-black hover:text-isabelline"
            onClick={toggle}
          >
            {isEnabled ? "End" : "Start"}
          </button>
          {isEnabled ? (
            <h1
              className={
                focus === "screen"
                  ? "text-6xl font-bold mt-6 py-8 rounded-md bg-fiery-rose"
                  : "text-6xl font-bold mt-6 py-8 rounded-md bg-medium-state-blue"
              }
            >
              {`${focus} -> ${time}`}
              <div>
                {focus === "relax" && "Remember to hydrate! Drink water."}
              </div>
            </h1>
          ) : (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col space-y-4 pt-4"
            >
              {unsavedChanges && (
                <div className="w-full p-6 border-solid border-4 rounded-lg border-black">
                  <strong>
                    Unsaved changes, click &quot;Save&quot; to keep your changes
                  </strong>
                </div>
              )}
              <label
                htmlFor="set-screen-time"
                className="flex flex-col space-y-4"
              >
                <strong>Set Screen Time</strong>
                <input
                  type="number"
                  className="rounded-full xl:w-1/4 lg:w-1/3 md:w-1/2"
                  step={1}
                  id="set-screen-time"
                  placeholder="Enter screen time in seconds"
                  min={relaxTime + 1}
                  max={defaultScreenTime}
                  value={screenTime}
                  onChange={(e) => {
                    setScreenTime(parseInt(e.target.value));
                    !unsavedChanges && setUnsavedChanges(true);
                  }}
                />
              </label>
              <label
                htmlFor="set-relax-time"
                className="flex flex-col space-y-4"
              >
                <strong>Set Relax Time</strong>
                <input
                  type="number"
                  className="rounded-full xl:w-1/4 lg:w-1/3 md:w-1/2"
                  step={1}
                  id="set-relax-time"
                  placeholder="Enter screen time in seconds"
                  value={relaxTime}
                  min={defaultRelaxTime}
                  onChange={(e) => {
                    setRelaxTime(parseInt(e.target.value));
                    !unsavedChanges && setUnsavedChanges(true);
                  }}
                />
              </label>
              <button
                className="px-8 py-2 border-4 font-bold rounded-full mt-4 border-eerie-black hover:bg-eerie-black hover:text-isabelline w-fit"
                onClick={() => {
                  localStorage.setItem("time", `${screenTime}`);
                  localStorage.setItem("relax", `${relaxTime}`);
                  setTime(screenTime);
                  setFocus("screen");
                  defaultScreenTime = screenTime;
                  defaultRelaxTime = relaxTime;
                  setUnsavedChanges(false);
                }}
              >
                Save
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
};
