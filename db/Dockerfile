FROM mongo:5.0.9-focal
COPY ./db.tar.gz /db.tar.gz
COPY entry.sh /
RUN chmod +x /entry.sh
ENTRYPOINT [ "/entry.sh"]
CMD ["mongod"]