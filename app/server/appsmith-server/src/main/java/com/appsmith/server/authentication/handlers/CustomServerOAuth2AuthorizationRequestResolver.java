package com.appsmith.server.authentication.handlers;

import com.appsmith.server.authentication.handlers.ce.CustomServerOAuth2AuthorizationRequestResolverCE;
import com.appsmith.server.configurations.CommonConfig;
import com.appsmith.server.helpers.RedirectHelper;
import com.appsmith.server.services.ConfigService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.web.server.util.matcher.PathPatternParserServerWebExchangeMatcher;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatcher;
import org.springframework.util.Assert;

public class CustomServerOAuth2AuthorizationRequestResolver extends CustomServerOAuth2AuthorizationRequestResolverCE {

    private final CommonConfig commonConfig;

    private final RedirectHelper redirectHelper;

    private final ReactiveClientRegistrationRepository clientRegistrationRepository;

    private final ServerWebExchangeMatcher authorizationRequestMatcher;

    private final ConfigService configService;

    /**
     * Creates a new instance
     *  @param clientRegistrationRepository the repository to resolve the {@link ClientRegistration}
     * @param commonConfig
     * @param redirectHelper
     * @param configService
     */
    public CustomServerOAuth2AuthorizationRequestResolver(ReactiveClientRegistrationRepository clientRegistrationRepository,
                                                          CommonConfig commonConfig,
                                                          RedirectHelper redirectHelper,
                                                          ConfigService configService) {
        this(clientRegistrationRepository, new PathPatternParserServerWebExchangeMatcher(
                DEFAULT_AUTHORIZATION_REQUEST_PATTERN), commonConfig, redirectHelper, configService);
    }

    /**
     * Creates a new instance
     *  @param clientRegistrationRepository the repository to resolve the {@link ClientRegistration}
     * @param authorizationRequestMatcher  the matcher that determines if the request is a match and extracts the
     *                                     {@link #DEFAULT_REGISTRATION_ID_URI_VARIABLE_NAME} from the path variables.
     * @param redirectHelper
     * @param configService
     */
    public CustomServerOAuth2AuthorizationRequestResolver(ReactiveClientRegistrationRepository clientRegistrationRepository,
                                                          ServerWebExchangeMatcher authorizationRequestMatcher,
                                                          CommonConfig commonConfig,
                                                          RedirectHelper redirectHelper, ConfigService configService) {
        super(clientRegistrationRepository, authorizationRequestMatcher, commonConfig, redirectHelper, configService);
        this.redirectHelper = redirectHelper;
        this.configService = configService;
        Assert.notNull(clientRegistrationRepository, "clientRegistrationRepository cannot be null");
        Assert.notNull(authorizationRequestMatcher, "authorizationRequestMatcher cannot be null");
        this.clientRegistrationRepository = clientRegistrationRepository;
        this.authorizationRequestMatcher = authorizationRequestMatcher;
        this.commonConfig = commonConfig;
    }
}
