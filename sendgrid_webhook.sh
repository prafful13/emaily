function localtunnel {
  lt -s nstzwhucmh -p 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done