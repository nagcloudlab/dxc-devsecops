


```bash
docker run -d -p 9090:9090 \
-v "$(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml" \
prom/prometheus
```

```bash
docker run -d -p 3000:3000 grafana/grafana
```

````bash
docker run -d -p 9411:9411 openzipkin/zipkin
```