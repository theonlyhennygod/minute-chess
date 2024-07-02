// components/Settings.js
const Settings = ({ settings, setSettings }) => {
  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-4 flex justify-center items-center">
      <label className="block mt-2">
        Timer:
        <select
          name="timer"
          value={settings.timer}
          onChange={handleChange}
          className="ml-2 p-1 border rounded text-black"
        >
          <option value={3}>3 minutes</option>
          <option value={5}>5 minutes</option>
          <option value={10}>10 minutes</option>
        </select>
      </label>
      <label className="block mt-2">
        Difficulty:
        <select
          name="difficulty"
          value={settings.difficulty}
          onChange={handleChange}
          className="ml-2 p-1 border rounded text-black"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    </div>
  );
};

export default Settings;
