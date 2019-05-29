FROM scratch
EXPOSE 8080
ENTRYPOINT ["/devpod-demo2"]
COPY ./bin/ /