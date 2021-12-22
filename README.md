# StockWatch

Design Choices:

- Reducing api calls:
When first coding this app I was remounting every screen when it was navigated to using react navigation "replace" because I wanted to provide the user with real time data. After finally realizing that this would result in far too many api calls I decided to rework the backend of my app. To reduce the number of api calls instead of remounting each screen when it gets navigated to, I only mount each screen when the user first enters the app. When the user enters the app they are directed to the loading screen which checks if they are logged in. If they are not logged in they are directed to the welcome screen. If they are logged in they are directed to the stocks screen. When they are directed to the stocks screen I simultaneously fetch the list of stocks that I support on the app, the top 10 trending stocks in the database and their percent change, what stocks the user has in their library and the user's stocks score and percent change. In my previous attempt I was making api calls from my stock component which results in the api being called for every single stock. Now, I group the top ten trending stocks and the users stocks into two seperate lists, and then make the api call resulting in significantly less api calls. As the user adds/removes stocks from their library I update a state which contains their list of stocks which is set when the user first enters the app. Then using an event listener I update the user's database everytime the screen state is "inactive" (when they swipe out of the app), and when the user signs out. To prevent this event listener from being called when the user is not signed in I first check to see if the library screen is mounted within the event listener before updating the database. To prevent the need to fetch the percent change/score for a stock when the user adds it to their library I pass the percent change/score for the stock as a prop from the stock display page (where it is already fetched) to the library page. Previously when the user was typing into the search bar for every letter they type I would make an api call which had a sort function to display stocks similar to what the user typed. Now I filter through the list of stocks that I fetch when the user first enters the app and display similar stocks using the .includes() function. Thus reducing the number of api calls I'm making from x to 1. 

- Cache vs. Using state:
Originally when reworking the backend I wanted to use a cache to store user data instead of states to reduce the number of api calls, but ultimately decided against it because everytime the user adds/removes a stock to their library or when I want to update the percent change/score for all of the user's stocks I would have to update the cache. Further, if the user has a lot of stocks in their library storing it in a local cache would hurt performance. I'm still unsure whether my approach to reducing the number of api calls/ database reads & writes is a good way to go about doing this. A problem that I can see occuring is the app crashing and the local user data being set to an empty array, thus resulting in the user losing their whole library. 

After our meeting caching and using a timeout is clearly the best method to reducing the number of api/db calls and improving scalability.



Security:

- Api Endpoints / Keys:
In the react native documentation they recommend storing your api keys and endpoints in either by using react-native-config or react-native-dotenv. I decided to use react-native-dotenv because the setup was very straight forward and it is compatible with expo. 

- Asynchronous data:
For storing unsensitive key value pairs you can use react native's Asynchronous Storage which writes unencrypted data directly to the device's disk. For storing sensitive key value pairs you can use expo's secure-store which stores encrypted data on the user's device. 

- Deep Linking:
A deep link is a way of sending data to your app from an outside source. To securely make use of deep linking for your app, react native recommmends using universal links. Mobile apps do not follow a common method for registering URL schemes. This means another application can register as the same url scheme as your app and send malicous data. 

- Firebase Rules:
Firebase has a set of rules which dictate whether the user can read/write from a database. If there is a problem with one of the rules a user might be able to read/write another users data. To prevent this from happening you can test your firebase rules.




Performance: 

- Flatlist Configuration:
The best way to improve performance is to configure your flatlits to only display the data needed at that time.



Testing:

- My Biggest Mistake:
After finally coming to the very end of my first app development journey I hit the testing wall. What I didn't realize in the coding process is that I should have been testing my code along the way, and writing testable code. Currently my code is very difficult to test because my business logic and state functionality is in the same place as my view functionality. So when I finish testing in the near future I will have to factor out all of my state functions, api calls, and database reads/writes. If you pair writing testable code with testing along the way it streamlines your workflow and makes testing far easier.

- Unit test (have done before):
Used to test smaller bits of code with no dependencies like state functions.

- Mocking:
Allows you to completely build up your code within the testing suite and pass in your own dependencies. This helps improve the testing time and is especially useful for testing services like APIs. 

- Component Tests:

    - Rendering:
        To make sure components are being rendered correctly I am using react-native-renderer which allows me to create a snapshot of a component which is the component in a JSX-like form, and compare it to the component rendered. This snapshot created from the component will be checked during code review for publishing to the app store

    - User Interaction:
        For testing user interaction I will use the react native testing library. This library allows you to call methods on a component that simulates user interaction. Then you use methods like getByText() which return whether or not a certain piece of text is on the screen. This will be very useful for testing adding/removing components.

- End-to-End Testing:
End-to-End testing involves testing your built up app in the configuration you want to release it in. Then using a library like Detox you run tests which automate the simulator and make sure the app is working like expected from the users view. Detox is somewhat similar to Selenium which I have a little experience with. 




Known Bugs:

- Date:
I need the current date to be able to fetch stock data for the user. To get the current date I use javascripts date object and methods. The api I'm using accepts the date in YYYY/MM/DD, and there are a couple edge cases I am not currently catching. For example, when it is the first day of the month I don't want to send my api a negative number for the day because it will throw an error. Currently if it is the first of the month, I decrement the month, then take 28 (lowest number of days in a month) and subract the remaining days from it. I need to create a date handler fucntion that will calculate the start/end date correctly.

- API:
The api I'm using clears certain data at 11:59pm EST and is repopulated again at 4am EST. To prevent this from breaking the app I catch all of the error codes and display helpful messages, but I would like to completely fix this. To still display data during this time period I can change the data I am fetching to the previous days data.





What I have learned:

- Know What You're Using:
Within react native there are countless packages, libraries, and frameworks available for you to use, but each one of these require dependencies that may not work with other packages you're using. 

- Clean Components:
After going through my code multiple times it seems as though each time I can factor out more and more code to be reusable components. The best approach to creating clean code in this manner is to plan everything out before you even start coding. This will save you lots of time on the front-end, and will leave you with very clean and concise components. 

- Write Testable Code/ Write tests while you code:
You should factor out every bit of code that affects a component into different classes because this allows you to very easily test this code. Also, if you do not start testing your code until you get to the very end it will be very difficult to test. Testing as you code allows you to test each component seperately to guarenteee that the component functions as you expect it to. (Should also use a .env and Constants file as you code so you don't have to go back and add everything to the file)

- Handling Data:
Before this I had never worked with javascript before. Javascript provides a wide range of utilities that you can use to handle data. Most significantly the filter method in tandom with another function. 

- Plan Out Your App:
Before you even think about coding the app you should have a detailed diagram of the apps lifecycle, plan out your navigation stack, know what functions you're calling when, how you're going to store data, what you're going to store data in, what components you're going to use, what packages/libraries/frameworks you are going to use, what components share what styles, etc... Then once you have an idea of all the resources you are going to use, set up the project directory: download everything you need, set up file structure, config folder, .env folder, Constants folder. Then begin implementing, starting with the big picture things like the navigation stack.

- Organize:
Make your project directory as clean as possible, and make components easy to read for other people by factoring out styles into stylesheets. 

- Scalability:
The scalability of an app really comes down to how much your app depends on outside resources, and what steps you take to update those outside resources as efficiently as possible. Now I can clearly see how caching is a great resource to making your app as scalable as possible.

- App Life Cycle:
This was by far the hardest concept for me to understand. Originally I had the viewpoint of just a single user interacting with the app, and did not understand the idea of caching at all. Now I can clearly see how to save data and allow multiple users to view the data without having to fetch the data for each user as I currently am doing.




Next steps:

First I will rework my backend to include a cache/timeout system to improve scalabillity. Then, I will factor out all of my screens to make the code far more testable, clean up my components, and test everything. After testing I will configure my project so it is ready to be deployed, and publish it using expo eas.


This class has helped me learn so much about the app develpment process, thank you and I can't wait to create more apps in the future!