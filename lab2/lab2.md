# Лабораторная работа №2

## 1. Замерьте скорость отдачи контента на сервере из лабораторной работы №1 

`ab -c 10 -n 100 http://localhost:5000/`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient).....done


Server Software:        Werkzeug/0.15.5
Server Hostname:        localhost
Server Port:            5000

Document Path:          /
Document Length:        124 bytes

Concurrency Level:      10
Time taken for tests:   0.140 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      27900 bytes
HTML transferred:       12400 bytes
Requests per second:    712.94 [#/sec] (mean)
Time per request:       14.026 [ms] (mean)
Time per request:       1.403 [ms] (mean, across all concurrent requests)
Transfer rate:          194.25 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       1
Processing:     3   13   2.4     12      18
Waiting:        3   12   2.3     12      17
Total:          4   13   2.3     13      19

Percentage of the requests served within a certain time (ms)
  50%     13
  66%     13
  75%     14
  80%     14
  90%     15
  95%     17
  98%     18
  99%     19
 100%     19 (longest request)
```

Логирование

```
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
127.0.0.1 - - [02/Oct/2019 11:27:39] "GET / HTTP/1.0" 200 -
```

`ab -c 100 -n 10000 http://127.0.0.1:5000/`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        Werkzeug/0.15.5
Server Hostname:        127.0.0.1
Server Port:            5000

Document Path:          /
Document Length:        124 bytes

Concurrency Level:      100
Time taken for tests:   18.838 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2790000 bytes
HTML transferred:       1240000 bytes
Requests per second:    530.83 [#/sec] (mean)
Time per request:       188.383 [ms] (mean)
Time per request:       1.884 [ms] (mean, across all concurrent requests)
Transfer rate:          144.63 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0   12  26.2      1     432
Processing:     3  175  54.6    174     648
Waiting:        1  170  56.0    172     647
Total:         15  187  51.0    187     653

Percentage of the requests served within a certain time (ms)
  50%    187
  66%    198
  75%    204
  80%    210
  90%    229
  95%    239
  98%    263
  99%    277
 100%    653 (longest request)
 ```


 Изображение `ab -c 100 -n 10000 http://127.0.0.1:5000/img/image.png`

 ```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        Werkzeug/0.15.5
Server Hostname:        127.0.0.1
Server Port:            5000

Document Path:          /img/image.png
Document Length:        232 bytes

Concurrency Level:      100
Time taken for tests:   19.076 seconds
Complete requests:      10000
Failed requests:        0
Non-2xx responses:      10000
Total transferred:      3790000 bytes
HTML transferred:       2320000 bytes
Requests per second:    524.22 [#/sec] (mean)
Time per request:       190.758 [ms] (mean)
Time per request:       1.908 [ms] (mean, across all concurrent requests)
Transfer rate:          194.02 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0   23  49.4      1     605
Processing:     6  167  49.2    157     671
Waiting:        4  158  41.9    151     609
Total:         21  189  75.6    163     767

Percentage of the requests served within a certain time (ms)
  50%    163
  66%    193
  75%    219
  80%    229
  90%    258
  95%    292
  98%    354
  99%    422
 100%    767 (longest request)
 ```


API?????

## 2. nginx сервер

```
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        location / {
	    proxy_pass http://localhost:5000;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

`ab -c 100 -n 10000 http://127.0.0.1/`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        nginx/1.17.3
Server Hostname:        localhost
Server Port:            80

Document Path:          /
Document Length:        124 bytes

Concurrency Level:      100
Time taken for tests:   60.125 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2820000 bytes
HTML transferred:       1240000 bytes
Requests per second:    166.32 [#/sec] (mean)
Time per request:       601.247 [ms] (mean)
Time per request:       6.012 [ms] (mean, across all concurrent requests)
Transfer rate:          45.80 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0  250 2378.6      6   24916
Processing:     8  348 401.1    251   24805
Waiting:        7  343 399.1    246   24803
Total:         11  598 2392.1    266   25140

Percentage of the requests served within a certain time (ms)
  50%    266
  66%    363
  75%    457
  80%    560
  90%    756
  95%    858
  98%   1043
  99%  23705
 100%  25140 (longest request)
```

`ab -c 100 -n 10000 http://127.0.0.1:5000/`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        Werkzeug/0.15.5
Server Hostname:        localhost
Server Port:            5000

Document Path:          /
Document Length:        124 bytes

Concurrency Level:      100
Time taken for tests:   18.896 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2790000 bytes
HTML transferred:       1240000 bytes
Requests per second:    529.20 [#/sec] (mean)
Time per request:       188.963 [ms] (mean)
Time per request:       1.890 [ms] (mean, across all concurrent requests)
Transfer rate:          144.19 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0   16  34.6      1     271
Processing:    10  171  38.6    162     362
Waiting:        1  165  39.1    153     361
Total:         12  188  49.3    183     416

Percentage of the requests served within a certain time (ms)
  50%    183
  66%    203
  75%    215
  80%    226
  90%    246
  95%    266
  98%    307
  99%    363
 100%    416 (longest request)
```

## 3. nginx отдача статического контента

```
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        location / {
	    #proxy_pass http://localhost:5000;
	    root /static/html;
        }

	    location /img/ {
	        root /static;
	    }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

`ab -c 100 -n 10000 http://127.0.0.1:5000/`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        Werkzeug/0.15.5
Server Hostname:        127.0.0.1
Server Port:            5000

Document Path:          /
Document Length:        124 bytes

Concurrency Level:      100
Time taken for tests:   18.736 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2790000 bytes
HTML transferred:       1240000 bytes
Requests per second:    533.73 [#/sec] (mean)
Time per request:       187.360 [ms] (mean)
Time per request:       1.874 [ms] (mean, across all concurrent requests)
Transfer rate:          145.42 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0   37  52.5      7     697
Processing:     4  148  62.4    135     804
Waiting:        1  135  57.2    115     750
Total:         10  186  81.7    194     872

Percentage of the requests served within a certain time (ms)
  50%    194
  66%    215
  75%    224
  80%    229
  90%    240
  95%    255
  98%    275
  99%    288
 100%    872 (longest request)
```


nginx `ab -c 100 -n 10000 http://127.0.0.1/`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        nginx/1.17.3
Server Hostname:        127.0.0.1
Server Port:            80

Document Path:          /
Document Length:        153 bytes

Concurrency Level:      100
Time taken for tests:   15.868 seconds
Complete requests:      10000
Failed requests:        0
Non-2xx responses:      10000
Total transferred:      3030000 bytes
HTML transferred:       1530000 bytes
Requests per second:    630.19 [#/sec] (mean)
Time per request:       158.683 [ms] (mean)
Time per request:       1.587 [ms] (mean, across all concurrent requests)
Transfer rate:          186.47 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0   65  48.5     51     358
Processing:     1   92  60.4     77     400
Waiting:        1   70  51.1     57     363
Total:         35  157  94.2    135     461

Percentage of the requests served within a certain time (ms)
  50%    135
  66%    182
  75%    222
  80%    243
  90%    296
  95%    335
  98%    378
  99%    408
 100%    461 (longest request)
```

Время от nginx меньше чем у flask Werkzeug

## 4. кеширование и gzip

#### Сжатие

```
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        gzip  on;
        gzip_comp_level 5;
        gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
	    #proxy_pass http://localhost:5000;
	    root /static/html;
        }

	    location /img/ {
	        root /static;
	    }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

`ab -c 100 -n 10000 http://127.0.0.1/`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        nginx/1.17.3
Server Hostname:        127.0.0.1
Server Port:            80

Document Path:          /
Document Length:        153 bytes

Concurrency Level:      100
Time taken for tests:   7.145 seconds
Complete requests:      10000
Failed requests:        0
Non-2xx responses:      10000
Total transferred:      3030000 bytes
HTML transferred:       1530000 bytes
Requests per second:    1399.67 [#/sec] (mean)
Time per request:       71.445 [ms] (mean)
Time per request:       0.714 [ms] (mean, across all concurrent requests)
Transfer rate:          414.16 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0   29  24.6     22     228
Processing:     1   42  32.4     34     251
Waiting:        1   32  27.6     24     230
Total:          6   71  49.7     60     292

Percentage of the requests served within a certain time (ms)
  50%     60
  66%     78
  75%     98
  80%    121
  90%    139
  95%    151
  98%    178
  99%    257
 100%    292 (longest request)
```

#### Кеширование

```
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=all:32m max_size=1g;

    server {
        listen 80;

        location / {
                proxy_pass http://127.0.0.1:81/;
                proxy_cache all;
                proxy_cache_valid any 1h;
        }
    }

    server {
        listen       81;
        server_name  localhost;

        gzip  on;
        gzip_comp_level 5;
        gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
	    #proxy_pass http://localhost:5000;
	    root /static/html;
        }

	    location /img/ {
	        root /static;
	    }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

`ab -c 10 -n 1000 http://127.0.0.1/`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        nginx/1.17.3
Server Hostname:        127.0.0.1
Server Port:            80

Document Path:          /
Document Length:        153 bytes

Concurrency Level:      10
Time taken for tests:   1.112 seconds
Complete requests:      1000
Failed requests:        0
Non-2xx responses:      1000
Total transferred:      303000 bytes
HTML transferred:       153000 bytes
Requests per second:    899.01 [#/sec] (mean)
Time per request:       11.123 [ms] (mean)
Time per request:       1.112 [ms] (mean, across all concurrent requests)
Transfer rate:          266.02 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       2
Processing:     2   11   2.6     10      21
Waiting:        1   10   2.6     10      21
Total:          2   11   2.7     11      22

Percentage of the requests served within a certain time (ms)
  50%     11
  66%     12
  75%     13
  80%     13
  90%     14
  95%     15
  98%     16
  99%     19
 100%     22 (longest request)
 ```



`ab -c 10 -n 1000 http://127.0.0.1:5000/`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        Werkzeug/0.15.5
Server Hostname:        127.0.0.1
Server Port:            5000

Document Path:          /
Document Length:        124 bytes

Concurrency Level:      10
Time taken for tests:   1.814 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      279000 bytes
HTML transferred:       124000 bytes
Requests per second:    551.30 [#/sec] (mean)
Time per request:       18.139 [ms] (mean)
Time per request:       1.814 [ms] (mean, across all concurrent requests)
Transfer rate:          150.21 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.9      0      14
Processing:     3   17   4.2     16      33
Waiting:        1   16   4.1     15      33
Total:          6   17   4.2     16      34
WARNING: The median and mean for the initial connection time are not within a normal deviation
        These results are probably not that reliable.

Percentage of the requests served within a certain time (ms)
  50%     16
  66%     18
  75%     19
  80%     20
  90%     23
  95%     27
  98%     30
  99%     32
 100%     34 (longest request)
```

Скорость приимерно одинаковая

## 5. Балансировка

```
worker_processes  1;


events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream backend  {
        least_conn;

        server 127.0.0.1:5000 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:5001 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:5002 max_fails=3 fail_timeout=30s;
    }

    sendfile        on;

    keepalive_timeout  65;

    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=all:32m max_size=1g;

    server {
        listen 80;

        location / {
                proxy_pass http://127.0.0.1:81/;
                proxy_cache all;
                proxy_cache_valid any 1h;
        }
    }

    server {
        listen       81;
        server_name  localhost;

        gzip  on;
	    gzip_comp_level 5;
        gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
	    #proxy_pass http://localhost:5000;
	    proxy_pass http://backend;
	    root /static/html;
        }

	    location /img/ {
	        root /static;
	    }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

## 6. Два мини-сервера

```
worker_processes  1;


events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream backend  {
        least_conn;

        server 127.0.0.1:5000 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:5001 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:5002 max_fails=3 fail_timeout=30s;
    }

    sendfile        on;

    keepalive_timeout  65;

    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=all:32m max_size=1g;

    server {
        listen 80;

        location / {
                proxy_pass http://127.0.0.1:81/;
                proxy_cache all;
                proxy_cache_valid any 1h;
        }

        location /service1 {
            proxy_pass http://localhost:5001/;
            proxy_cache all;
            proxy_cache_valid any 1h;
        }

        location /service1/temp { 
            proxy_pass http://localhost:5001/temp/;
        }

        location /service2 {
            proxy_pass http://localhost:5002/;
            proxy_cache all;
            proxy_cache_valid any 1h;
        }

        location /service2/temp {
            proxy_pass http://localhost:5002/temp/;
        }
    }

    server {
        listen       81;
        server_name  localhost;

        gzip  on;
	    gzip_comp_level 5;
        gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
	    #proxy_pass http://localhost:5000;
	    proxy_pass http://backend;
	    root /static/html;
        }

	    location /img/ {
	        root /static;
	    }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

Тест скорости отдачи контента с включенным gzip, кешированием данных и балансировкой: `ab -c 10 -n 1000 http://127.0.0.1/service1`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        nginx/1.17.3
Server Hostname:        127.0.0.1
Server Port:            80

Document Path:          /service1
Document Length:        89 bytes

Concurrency Level:      10
Time taken for tests:   3.329 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      246000 bytes
HTML transferred:       89000 bytes
Requests per second:    300.41 [#/sec] (mean)
Time per request:       33.288 [ms] (mean)
Time per request:       3.329 [ms] (mean, across all concurrent requests)
Transfer rate:          72.17 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.5      0       8
Processing:     3   32  13.7     29      90
Waiting:        3   32  13.3     29      89
Total:          4   33  13.8     30      90

Percentage of the requests served within a certain time (ms)
  50%     30
  66%     34
  75%     38
  80%     42
  90%     53
  95%     62
  98%     70
  99%     78
 100%     90 (longest request)
```

Тест скорости отдачи контента с включенным gzip, кешированием данных и балансировкой: `ab -c 10 -n 100 http://127.0.0.1/service1/temp`

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        nginx/1.17.3
Server Hostname:        127.0.0.1
Server Port:            80

Document Path:          /service1/temp
Document Length:        47 bytes

Concurrency Level:      10
Time taken for tests:   37.844 seconds
Complete requests:      1000
Failed requests:        1
   (Connect: 0, Receive: 0, Length: 1, Exceptions: 0)
Non-2xx responses:      1
Total transferred:      256036 bytes
HTML transferred:       99016 bytes
Requests per second:    26.42 [#/sec] (mean)
Time per request:       378.444 [ms] (mean)
Time per request:       37.844 [ms] (mean, across all concurrent requests)
Transfer rate:          6.61 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.3      0       5
Processing:   271  373  44.9    368     852
Waiting:      271  373  44.9    368     851
Total:        271  373  44.9    369     852

Percentage of the requests served within a certain time (ms)
  50%    369
  66%    382
  75%    393
  80%    400
  90%    426
  95%    449
  98%    470
  99%    488
 100%    852 (longest request)
 ```


## 7. Состояние сервера

```
worker_processes  1;


events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream backend  {
        least_conn;

        server 127.0.0.1:5000 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:5001 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:5002 max_fails=3 fail_timeout=30s;
    }

    sendfile        on;

    keepalive_timeout  65;

    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=all:32m max_size=1g;

    server {
        listen 80;

        location / {
                proxy_pass http://127.0.0.1:81/;
                proxy_cache all;
                proxy_cache_valid any 1h;
        }

        location /service1 {
            proxy_pass http://localhost:5001/;
            proxy_cache all;
            proxy_cache_valid any 1h;
        }

        location /service1/temp { 
            proxy_pass http://localhost:5001/temp/;
        }

        location /service2 {
            proxy_pass http://localhost:5002/;
            proxy_cache all;
            proxy_cache_valid any 1h;
        }

        location /service2/temp {
            proxy_pass http://localhost:5002/temp/;
        }

        location = /basic_status {
 	        stub_status;
	    }
    }

    server {
        listen       81;
        server_name  localhost;

        gzip  on;
	    gzip_comp_level 5;
        gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
	    #proxy_pass http://localhost:5000;
	    proxy_pass http://backend;
	    root /static/html;
        }

	    location /img/ {
	        root /static;
	    }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

Тест скорости отдачи контента с включенным gzip, кешированием данных и балансировкой: `ab -c 100 -n 10000 http://127.0.0.1/basic_status/`


```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        nginx/1.17.3
Server Hostname:        127.0.0.1
Server Port:            80

Document Path:          /basic_status/
Document Length:        494 bytes

Concurrency Level:      10
Time taken for tests:   1.898 seconds
Complete requests:      1000
Failed requests:        0
Non-2xx responses:      1000
Total transferred:      668000 bytes
HTML transferred:       494000 bytes
Requests per second:    526.96 [#/sec] (mean)
Time per request:       18.977 [ms] (mean)
Time per request:       1.898 [ms] (mean, across all concurrent requests)
Transfer rate:          343.76 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.4      1       4
Processing:     5   18   3.6     17      37
Waiting:        2   17   3.6     16      36
Total:          8   18   3.7     17      37

Percentage of the requests served within a certain time (ms)
  50%     17
  66%     19
  75%     20
  80%     21
  90%     22
  95%     25
  98%     27
  99%     29
 100%     37 (longest request)
```

Страница `http://localhost/basic_status`

```
Active connections: 2 
server accepts handled requests
 28435 28435 28437 
Reading: 0 Writing: 1 Waiting: 1 
```

# Дополнительные задания

## 1. https

С помощью команды 

```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

создается самоподписный сертификат.

Полученные файлы размещаются в `/ssl`

nginx.conf

```
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    
    keepalive_timeout  65;

    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=all:32m max_size=1g;

    server {
        listen 80;
	listen 443 ssl;
	ssl_certificate /ssl/localhost.crt;
	ssl_certificate_key /ssl/localhost.key;

	root /server/static/html;

        location / {
                proxy_pass http://127.0.0.1:81/;
                proxy_cache all;
                proxy_cache_valid any 1h;
        }
    }

    server {
        listen       81;
        server_name  localhost;

        gzip  on;
        gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
	        root /server/static/html;
        }

	    location /img/ {
	        root /server/static;
	    }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root html;
        }
    }
}
```

## 2. ServerPush картинки

```worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    
    keepalive_timeout  65;

    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=all:32m max_size=1g;

    server {
        listen 80;
        listen 443 ssl http2;
        ssl_certificate /ssl/localhost.crt;
        ssl_certificate_key /ssl/localhost.key;

        root /server/static/html;

        location / {
                proxy_pass http://127.0.0.1:81/;
                proxy_cache all;
                proxy_cache_valid any 1h;

                http2_push /img.sml.jpg;
        }
    }

    server {
        listen       81;
        server_name  localhost;

        gzip  on;
        gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        location / {
	        root /server/static/html;
        }

	    location /img/ {
	        root /server/static;
	    }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root html;
        }
    }
}
```

Каждый раз, когда клиент запрашивает /, отправляется /img/sml.jpg

![](https://sun9-42.userapi.com/c858324/v858324804/975a2/j9tMnVZCEe4.jpg)


При последующем обновлении страницы не будет тратится время на передачу картинки

![](https://sun9-7.userapi.com/c854532/v854532804/110640/8t7-YLjnpD8.jpg)


## 3. Скрыть все заголовки Server

Для сокрытиия версии из заголовка необходимо раскомментировать в nginx.conf строку 

`server_tokens off;`

С помощью подписи сервера можно получить информацию об используемом ПО. Зная версию используемого ПО, можено воспользоваться информацией об уязвимостях этого ПО, которая находится в открытом доступе.
