import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { sleep, check, fail } from 'k6';
import exec from "k6/execution";

const host = 'http://myapp:4000';

const users = new SharedArray('users', function () {
    return JSON.parse(open('./user.json')).user;
});

const songs = new SharedArray('songs', function () {
    return JSON.parse(open('./song.json')).song;
});

export const options = {
    scenarios: {
        favs: {
          executor: 'ramping-vus',
          exec: 'favs',
          startVUs: 0,
          stages: [
            { duration: '6s', target: 20 },
            { duration: '12s', target: 20 },
            { duration: '6s', target: 0 },
          ],
          gracefulRampDown: '1s',
        },
        randFails: {
            executor: 'ramping-vus',
            exec: 'randFails',
            startVUs: 0,
            stages: [
              { duration: '6s', target: 10 },
              { duration: '12s', target: 10 },
              { duration: '6s', target: 0 },
            ],
            gracefulRampDown: '1s',
        }
    },
    // tags: {
    //     pipeline_id: '1',
    // },
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
        'http_req_duration{perfTag:create_user}': ['p(95)<1000'], // 95% of create_user requests must complete below 1000ms
        'http_req_duration{perfTag:create_song}': ['p(95)<1000'], // 95% of create_song requests must complete below 1000ms
        'http_req_duration{perfTag:create_fav}': ['p(95)<1000'], // 95% of create_fav requests must complete below 1000ms
    }
};

export function favs() {
    // console.log(`VU = ${__VU}; iteration = ${__ITER}; index = ${exec.scenario.iterationInTest}; data = ${JSON.stringify(users[exec.scenario.iterationInTest].name)}`);
    let { user_id } = create_user();
    sleep(3);
    let { song_id } = create_song();
    sleep(3);
    create_fav(user_id, song_id);
    sleep(3);
};

export function randFails() {
    const tag = 'randFails';
    const rand_fail_res = http.post(`${host}/randomFail`, JSON.stringify({}), {
        headers: { 'Content-Type': 'application/json' },
        tags: { perfTag: tag },
    });
    assertResponseStatus(tag, rand_fail_res, 200);
    sleep(3);
};

function create_user() {
    const tag = 'create_user';
    const user_res = http.post(`${host}/user`, JSON.stringify({name: users[exec.scenario.iterationInTest].name}), {
        headers: { 'Content-Type': 'application/json' },
        tags: { perfTag: tag },
    });
    assertResponseStatus(tag, user_res, 200);
    let user_id = JSON.parse(user_res.body).body.id;
    return { user_id: user_id}
}

function create_song(){
    const tag = 'create_song';
    const song_res = http.post(`${host}/song`, 
        JSON.stringify({
            name: songs[exec.scenario.iterationInTest].name, 
            duration: songs[exec.scenario.iterationInTest].duration
        }), 
        {
            headers: { 'Content-Type': 'application/json' },
            tags: { perfTag: tag },
        }
    );
    assertResponseStatus(tag, song_res, 200);
    let song_id = JSON.parse(song_res.body).body.id;
    return { song_id: song_id };
}

function create_fav(user_id, song_id){
    const tag = 'create_fav';
    const fav_res = http.post(`${host}/fav`, 
        JSON.stringify({
            song_id: song_id, 
            user_id: user_id
        }), 
        {
            headers: { 'Content-Type': 'application/json' },
            tags: { perfTag: tag },
        }
    );
    assertResponseStatus(tag, fav_res, 200);
}

function assertResponseStatus(tag, response, expectedStatusCode = 200) {
   if(!check(
        response,
        { [`status code check for ${tag}`]: (r) => r.status === expectedStatusCode 
        },{ perfTag: tag }
    )){
        fail(`status code of ${tag} was *not* 200`);
    }
  }