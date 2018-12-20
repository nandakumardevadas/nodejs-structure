class DashboardController {
    get Dashboard() {
        return (req, res, next) => {
            res.send('Dashboard');
        }
    }
}

module.exports = new DashboardController();