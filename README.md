# GA Project 3 - Soccer Brackets

## Introduction
Soccer Brackets is a simple React app, that allows users to make predictions for major Soccer competitions like the World Cup, UEFA Euros etc. They can make their predition for group stage games, as well as knockout games. When the games happen, scores are calculated, and a leaderboard is generated. 

## Getting Started
**Front End - Netlify:**
- https://swaroop-soccer-brackets.netlify.app

**Back End - Heroku:**
- https://brackets-backend.herokuapp.com/


## Technologies Used
- HTML5
- CSS3
    - CSS Flexbox
    - Materialize CSS
- JavaScript
- React.js
    - Array-Move (helps with sorting array data)
    - React Sortable HOC (High Order Components) - Used for soring and moving React Components
    - Client Side Routing
- MongoDB
- Node.JS
- Express.JS
- AJAX
- Google Firebase (Authentication and Authorization)

## Other NPM Packages Used
- Mongoose
- Morgan
- DotEnv (for setting the environment variables in the .env file)
- Chance (package that helps create random data)

## Service Modules 
- Firebase Service
    - Login
    - Logout
- Picks Service
    - URL: `https://brackets-backend.herokuapp.com/api/picks`
    - Fetch user picks: `get /api/picks` 
    - Fetch ALL users picks: `get /api/picks/all`
    - Create Picks for a user: `post /api/picks`
    - Update a pick for a user: `put /api/picks/<:id>`
    - Delete a selected pick for a user: `delete /api/picks/<:id>`
- Results Service 
    - URL: `https://brackets-backend.herokuapp.com/api/results`
    - Create results in monboDB: `post /api/results`
    - Fetch game results from MongoDB: `get /api/results`
    

## App CRUD Functionality
- **Create** group stage picks
- **Read** group stage picks for a user and display them in Current Picks page
- **Read** group stage picks for ALL users and display total Points in leaderboard. 
- **Update** group stage picks with totalPoints when points are calculated
- **Delete** Delete group stage picks


## Third Party APIs used
**World Cup 2018 - Groups:**
https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.groups.json

**World Cup 2018 - Results:**
https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.standings.json

## Wireframes 
These were the wireframes I created before starting to write any code for this project. 

### Group Stages
![groups](https://i.imgur.com/r1RuqQO.png)

### Knockout Games
![knockouts](https://i.imgur.com/VeOK630.png)

### Leaderboard 
![leader](https://i.imgur.com/tJWnibW.png)


## ERD Diagram
- The only schema needed for this application is the `Picks Schema', which can hold information for group stage picks, and also for all the knockout round picks. 

**ERD - Initial Design:**
![erd](https://i.imgur.com/m5xtNOn.png)

**ERD - Final Schemas:**
```javascript
const picksSchema = new mongoose.Schema({
    'Group A': [],
    'Group B': [],
    'Group C': [],
    'Group D': [],
    'Group E': [],
    'Group F': [],
    'Group G': [],
    'Group H': [],
    roundOf16Picks: {},
    quartersPicks: {},
    semisPicks: {},
    finalPick: String,
    totalPoints: Number,
    uid: String,
    username: String,
    photo: String
},
    {
        timestamps: true
    }
);


const resultsSchema = new mongoose.Schema({
    'Group A': [],
    'Group B': [],
    'Group C': [],
    'Group D': [],
    'Group E': [],
    'Group F': [],
    'Group G': [],
    'Group H': [],
    roundOf16Results: {},
    quartersResults: {},
    semisResults: {},
    finalResult: String,
},
    {
        timestamps: true
    }
);
```

## App Screenshots

### Login Screen
![loginForm](https://i.imgur.com/7RUXCZq.png)

### User Landing Page - Dashboard
![landingPage](https://i.imgur.com/SVGzsLy.jpg)

### Group Stages Picks
![gropuStagepage](https://i.imgur.com/repqdpT.jpg)

### Knockout Stages Page
![knockouts](https://i.imgur.com/pR6dzlK.png)

### Current Picks
![currentPicks](https://i.imgur.com/eYgvy0L.jpg)

### Leaderboard
![leaderboard](https://i.imgur.com/WZlq7qg.jpg)


## Challenges

### Making Group Stage Selections 
**Problem**
- I needed to capture the group stage finishing positions predicted by each user. Thinking through how to properly capture the order of positions for each group captured by each user took me a while to think through. 

**Solution**
- I researched online and found these `react-sortable-hoc` and `array-move` libraries that allow to "Drag and Drop" react components. This would allow the user to easily drap the teams to the positions they want to predict. 
- The implementation took a while due to the learning curve, and capturing data and saving them in state also took a while due to added complications, but in the end, the implementation worked out great. 

**Code**
```javascript
const SortableTeamsContainer = sortableContainer(({ children }) => <div className='teams'>{children}</div>);
const SortableTeam = sortableElement(({ team }) => <Team key={team} team={team} />)
  

const Group = (props) => {
    const [teams, setTeams] = useState(props.group);
    const onSortEnd = ({oldIndex, newIndex}) => setTeams(arrayMove(teams, oldIndex, newIndex));

    return (
        <article className={style.groupCard}>   
            <div className={style.groupName}>{props.groupLetter}</div>
            <SortableTeamsContainer onSortEnd={onSortEnd}>
                {
                    teams.map((team, i) => (
                        <SortableTeam
                            index={i}
                            team={team}
                            key={team.code}
                        />
                    ))
                }
            </SortableTeamsContainer>
            <button onClick={(e) => {
                let teamsArr = [];
                teams.forEach(team => {
                    teamsArr.push(team.name);
                });
                props.saveGroupPick(teamsArr, e, props.groupLetter)}
            }>Save</button>
        </article>
    )
}

```

### Create Card flow - User for a new card application could not be found
**Problem**
- When submitting new card form, Could not find user _id since it was not part of req.params
- So user information for a given card could not be displayed in the card main index page 

**Solution**
- Solved this issue by first using the `findOne()` method for finding the User based on first name and last name
- Then the entire code for `Model.create()` was run inside the findOne fucntion, so that i could pass in the user information for that card. 
- Solution code for the card create controller function below: 

```javascript 
function create(req, res) {
    let nameSplitArr = req.body.applicant.split(' ');
    User.findOne({
        firstName: nameSplitArr[0],
        lastName: nameSplitArr[1]
    }, function (err, user) {
        let newCardObj = {
            applicant: user._id,
            issuer: req.body.issuer,
            cardName: req.body.cardName,
            appDate: req.body.appDate,
            creditPull: [req.body.experian, req.body.equifax, req.body.transunion],
            nextFeeDate: req.body.nextFeeDate,
            creditLine: req.body.creditLine,
            bonusSpend: req.body.bonusSpend,
            bonusSpendDate: req.body.bonusSpendDate,
            annualFee: req.body.annualFee
        }
        Card.create(newCardObj, function(err, card){
            if(err) return res.redirect('/cards/new');
            res.redirect('/cards');
        })
    })
}
```

## Future Enhancements

### Complete Knockout Round Picks
- User should be able to make their picks after each round of games
- After each round of games are completed, they can "simulate" results, and calculate points as well 

### Admin Functionaly
- Implement admin functionality so that the admin can see all of user picks, edit or delete picks for any user etc. 

### Country Flags
- Get flags from https://www.countryflags.io/ to display any time a country is displayed

### Group Stage Numbering
- Add numbering functionality to the group stage drag and drop, so that when a country is dropped, a number will be rendered for the position. 

## Bugs
- User Dashboard - The checklist for 'Group Results Simulated' and 'Points Calculated' fields do not set properly until page is refreshed. 
- <strike>Submit Picks routing - When the user clicks 'Submit Picks' in Group Stage page, the `Link` is setup up route to `/currentPicks`, but it does not, it stays on the same page. 
<div className='submitBtnWrapper'>            
    <Link to='/currentPicks' onClick={(e) => props.handleSubmit(e)} className="btn waves-effect waves-light submitGrpPicks">Submit Picks</Link>
</div>
```</strike>  
        - This bug has been fixed. 

## Key Takeaways
- React kicked my butt, it's going to take some time to by comfortable with it
- State can be very hard to manage, especially when you are conducting multiple CRUD functionalities, and have to adjust state every time. 
- I need to understand the concept of `prevState` and `spread operators` a bit better 
- I need to understand react hooks a bit better. 
- React Client side routing and Links are incredibly powerful, and with the use of 'Pages', they make it easy and fun to create a SPA (Single Page Application)