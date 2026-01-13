import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

public class savemanger {
    public record SaveData(String label, int step) {}

    public static void main(String[] args) throws Exception {
        var server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.setExecutor(Executors.newVirtualThreadPerTaskExecutor());

        server.createContext("/save", exchange -> {
            // Menambahkan Header CORS agar bisa diakses dari perangkat luar (HP)
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            String json = "{\"status\":\"success\", \"message\":\"Saved at IP 192.168.1.7\"}";
            exchange.sendResponseHeaders(200, json.length());
            exchange.getResponseBody().write(json.getBytes());
            exchange.close();
            System.out.println("Save request received from mobile/browser!");
        });

        System.out.println("Java Backend Running on 192.168.1.7:8080");
        server.start();
    }
}