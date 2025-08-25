# Code Citations

## License: unknown

https://github.com/ClockworkFTW/workout-log-server/tree/453ba4008ea5732791ec5ed86c0e76612b60bf6b/routes/user.js

```
("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).
```
