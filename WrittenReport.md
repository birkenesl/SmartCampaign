Meta:

I am the only member of my team.
~ smartcampaign.skyflume.com
~ URL of github repository with code for deployed app
~ App is deployed and working well for the most part
~ What work did I do: Everything, with some code attributions as needed


App:

My project application is meant to be a smart survey platform for businesses and customers. The idea is that businesses can create test ad campaigns, and receive real feedback from customers they target through a variety of filters (age, gender, income level, education level, etc). When a customer receives an ad campaign, they write several sentences about how they feel about the ad. Their incentive to do this is based on coupon codes offered by businesses for completing a given ad campaign survey - for example, Business X may offer a 10% off code for their Product Y upon successful completion of the survey. Businesses can view the results of their campaign in detail or in summary - using IBM Watson's Tone Analyzer API, every response is analyzed to create an average tone statistic for the campaign. The possible tones analyzed by the IBM Watson API include: Anger, Fear, Joy, Sadness, Analytical, Confident, and Tentative. The total tone results of a campaign are graphically displayed using (TODO: CHOOSE BETWEEN QUICKCHARTS API OR NATIVE REACT CHART LIBRARIES).

My app concept has changes significantly since the proposal. Originally, the application was going to be a text scheduler with real time conversations (and an unrelated additional feature of being able to add nearby users with a location API). After the proposal, I made a series of changes to this idea which eventually brought me to this project. First, I decided it would be neat to include a tone analyzer API so that users of the application could theoretically send out a batch text to a bunch of numbers, and then get bulk emotional analysis of how everyone responded. I also decided it might make sense to have this feature only available to "business-tier" accounts. After much research into Twilio's API, I realized that real-time conversations would turn into a real-time headache, when combined with my idea of analyzing the tone of the responses. This is primarily because of the following factors: The limit on messages sent within a certain timeframe, the way Twilio posts responses, and the trickiness of keeping track of a certain conversation. There was no conceivable way to create multiple "text campaigns" that involved the same recipient number. Finally, having each user of the app have their own number from which to send messages was ideal - but each Twilio number cost something like $1 or $2. This seemed highly unsustainable and avoiding this by having multiple users sharing the same Twilio number for the app would cause various problems.

So, I decided to keep part of my app concept and toss the aspect that would probably kill my project. In the end, I feel that while having text sending capabilities would be more impressive, my new app concept was more complete and solid.



My "neat" features of the app include the graph representation of the
tones analyzed through the responses. This uses the quickchart api on the front end.

The complex part of my app would probably be the server size API that uses the IBM Watson Tone Analyzer Endpoint, along with the logic that makes up how ad campaigns and customers interact.

Regarding the project requirements, my project is a React-SPA front end with an elixir back end that exposes a JSON API. It does have authentication for specific scenarios. The server side code uses the IBM Watson Tone Analyzer API, which requires authentication of the app itself (using my own personal IBM Cloud account api key). The neat feature is discussed briefly above, but involves graphical representation of the tone information gained by the server side API. The database stores users and my app has password authentication using Argon.  
However, I realize I did not implement any real time behavior using channels.

This app required a lot of testing, because the entire concept requires multiple users (multiple businesses, multiple customers)


The most significant challenge for this project was probably getting the server side tone analyzer api to work, because of some vague docs. I solved this challenge with a lot of testing using the HTTPoison library, and a lot of StackOverflow leading me to pull some tricks to get the data I needed.
